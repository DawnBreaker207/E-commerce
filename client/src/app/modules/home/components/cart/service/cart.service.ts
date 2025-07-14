import { Cart } from '@/app/data/model/cart';
import { Product } from '@/app/data/model/product';
import { CartServerService } from '@/app/data/services/cart/cart-server.service';
import { ProductService } from '@/app/data/services/product/product.service';
import { generateId } from '@/app/shared/utils/generateId';
import { Injectable, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  EMPTY,
  finalize,
  of,
  retry,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError,
  timeout,
} from 'rxjs';

const CART_KEY = 'guest_cart';
@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  private totalSubject = new BehaviorSubject<number>(0);
  private totalQuantitySubject = new BehaviorSubject<number>(0);

  private productMap = new Map<number, Product>();
  private destroy$ = new Subject<void>();
  private loginInProgress = false;

  cart$ = this.cartSubject.asObservable();
  total$ = this.totalSubject.asObservable();
  quantity$ = this.totalQuantitySubject.asObservable();

  private isLoggedIn = false;
  private userId = '';

  constructor(
    private cartServer: CartServerService,
    private productService: ProductService,
    private readonly oidcSecurityService: OidcSecurityService,
  ) {
    this.initializeService();
  }

  //* Initial Cart
  private initializeService() {
    this.initializeLocalCart();

    this.oidcSecurityService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe(({ isAuthenticated }) => {
      this.isLoggedIn = isAuthenticated;
    });

    this.oidcSecurityService.userData$.pipe(takeUntil(this.destroy$), debounceTime(100)).subscribe(({ userData }) => {
      if (userData?.sub && userData.sub !== this.userId) {
        this.handleUserLogin(userData.sub);
      } else if (!userData?.sub && this.isLoggedIn) {
        this.logout();
      }
    });

    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.setProducts(products);
      });
  }

  //* Login cart and update
  login(userId: string) {
    if (this.loginInProgress) {
      return EMPTY;
    }

    // this.isLoggedIn = true;
    // this.userId = userId;
    this.loginInProgress = true;

    const localCart = this.loadLocalCart();

    return this.cartServer.getCart(userId).pipe(
      timeout(10000),
      switchMap((serverCart) => {
        const initialCart = serverCart ?? this.createEmptyCart(userId);

        if (localCart?.cart_items?.length) {
          const mergedCart = this.mergeCart(initialCart, localCart);
          return this.cartServer.createCart(this.cleanCart(mergedCart)).pipe(
            tap((cart) => {
              this.clearLocalCart();
              this.setCart(cart);
            }),
          );
        } else {
          this.setCart(initialCart);
          return of(serverCart);
        }
      }),
      catchError((error) => {
        console.error('Login cart sync failed:', error);

        if (localCart) {
          this.setCart(localCart);
        }
        return of(localCart);
      }),
      finalize(() => {
        this.loginInProgress = false;
        this.isLoggedIn = true;
        this.userId = userId;
      }),
    );
  }

  //* Cart CRUD
  addProductInCart(productId: number, quantity: number) {
    let cart = { ...(this.cartSubject.value ?? this.createEmptyCart(this.userId)) };
    cart.cart_items = [...cart.cart_items];

    const product = this.productMap.get(productId);
    if (!product) {
      return throwError(() => new Error('Product not found'));
    }

    const existing = cart.cart_items.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.cart_items.push({
        cartItemId: generateId(),
        cartId: cart.cartId,
        productId,
        quantity,
      });
    }
    return this.saveCart(cart);
  }

  updateProductInCart(cartItemId: number, quantity: number) {
    if (quantity < 0) {
      return throwError(() => new Error('Quantity cannot be negative'));
    }
    const cart = { ...this.cartSubject.value } as Cart;
    if (!cart.cart_items.length) return of(null);

    const item = cart.cart_items.find((i) => i.cartItemId === cartItemId);
    if (!item) return throwError(() => new Error('Item not found in cart'));

    if (quantity === 0) return this.removeProductInCart(cartItemId);

    item.quantity = quantity;

    return this.saveCart(cart);
  }

  removeProductInCart(cartItemId: number) {
    const cart = { ...this.cartSubject.value } as Cart;
    if (!cart.cart_items) return throwError(() => new Error('Cart is empty'));

    const item = cart.cart_items.filter((i) => i.cartItemId !== cartItemId);
    if (item.length === cart.cart_items.length) {
      return throwError(() => new Error('Item not found in cart'));
    }
    cart.cart_items = item;
    return this.saveCart(cart);
  }
  clearCart() {
    const cart = { ...this.cartSubject.value } as Cart;
    if (!cart) return of(null);
    const clearedCart = {
      ...cart,
      cart_items: [],
    };
    return this.saveCart(clearedCart);
  }

  // Cart API
  private saveCart(cart: Cart) {
    this.setCart(cart);

    if (this.isLoggedIn) {
      const save$ = cart.cartId
        ? this.cartServer.updateCart(this.cleanCart(cart))
        : this.cartServer.createCart(this.cleanCart(cart));
      return save$.pipe(
        retry(2),
        tap((update) => this.setCart(update)),
        catchError((err) => {
          console.log('Server save failed, saving locally', err);

          this.saveLocalCart(cart);
          return of(cart);
        }),
      );
    } else {
      this.saveLocalCart(cart);
      return of(cart);
    }
  }

  private mergeCart(serverCart: Cart, localCart: Cart) {
    const mergeItems = [...serverCart.cart_items];

    for (const localItem of localCart.cart_items) {
      const existing = mergeItems.find((item) => item.productId === localItem.productId);
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        mergeItems.push({ ...localItem, cartId: serverCart.cartId });
      }
    }

    return {
      ...serverCart,
      cart_items: mergeItems,
    };
  }

  //* Local Storage
  private initializeLocalCart() {
    try {
      let cart = this.loadLocalCart();
      if (!cart) {
        cart = this.createEmptyCart(this.userId);
        this.saveLocalCart(cart);
      }
      this.setCart(cart);
    } catch (error) {
      console.error('Failed to initialize local cart:', error);
      this.setCart(this.createEmptyCart(this.userId));
    }
  }

  private loadLocalCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load local card:', error);

      return null;
    }
  }

  private saveLocalCart(cart: Cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      this.setCart(cart);
    } catch (error) {
      console.error('Failed to save local cart', error);
    }
  }

  private clearLocalCart() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error('Failed to clear local cart', error);
    }
  }

  private setCart(cart: Cart) {
    this.cartSubject.next(cart);
    this.recalculateTotal();
  }

  private clearCartState() {
    this.cartSubject.next(null);
    this.totalSubject.next(0);
    this.totalQuantitySubject.next(0);
  }

  public setProducts(products: Product[]) {
    this.productMap.clear();
    products.forEach((p) => this.productMap.set(+p.productId!, p));
    this.recalculateTotal();
  }

  //* Helper & Utils
  recalculateTotal() {
    const cart = this.cartSubject.value;
    if (!cart?.cart_items?.length) {
      this.totalSubject.next(0);
      this.totalQuantitySubject.next(0);
      return;
    }
    let total = 0;
    let totalQuantity = 0;
    let invalidItemsCount = 0;

    for (const item of cart.cart_items) {
      const product = this.productMap.get(item.productId);
      if (product && product.price != null) {
        total += product.price * item.quantity;
        totalQuantity += item.quantity;
      } else {
        invalidItemsCount++;
        console.warn(`Product ${item.quantity} not found or has invalid price`);
      }
    }

    if (invalidItemsCount > 0) {
      console.warn(`Found ${invalidItemsCount} invalid items in cart`);
    }
    this.totalSubject.next(total);
    this.totalQuantitySubject.next(totalQuantity);
  }

  getProductId(productId: number) {
    return this.productMap.get(productId);
  }

  private createEmptyCart(userId: string): Cart {
    return { userId: userId || '', cart_items: [], cartId: undefined };
  }

  private cleanCart(cart: Cart): Cart {
    return {
      ...cart,
      cart_items: cart.cart_items.map((item) => {
        const cleanedItem = { ...item };
        if (!cleanedItem.cartItemId || cleanedItem.cartItemId > 0 || cleanedItem.cartItemId < 0) {
          delete cleanedItem.cartItemId;
        }

        return cleanedItem;
      }),
    };
  }

  isCartEmpty() {
    const cart = this.cartSubject.value;
    return !cart?.cart_items.length;
  }

  getCartItemsCount() {
    return this.totalQuantitySubject.value;
  }

  getCartTotal() {
    return this.totalSubject.value;
  }

  getCurrentCart() {
    return this.cartSubject.value;
  }

  private handleUserLogin(userId: string) {
    if (this.loginInProgress) return;
    this.login(userId).subscribe({
      error: (error) => console.error('Login failed', error),
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = '';
    this.loginInProgress = false;
    this.clearCartState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
