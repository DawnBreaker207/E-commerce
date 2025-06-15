import { ToastService } from '@/app/shared/services/toast.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, switchMap, take, tap, throwError, timer } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const oidc = inject(OidcSecurityService);
  const toast = inject(ToastService);

  const isAdminApi = req.url.includes('/admin');
  return next(req).pipe(
    catchError((err) =>
      oidc.isAuthenticated$.pipe(
        take(1),
        switchMap((isAuthenticated) => {
          if (err.status === 401 && isAuthenticated && isAdminApi) {
            toast.show('Your session has expired', 'error');
            return timer(3000).pipe(
              tap(() => oidc.authorize()),
              switchMap(() => throwError(() => err)),
            );
          }
          return throwError(() => err);
        }),
      ),
    ),
  );
};
