package com.dawn.server.service.Impl;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dawn.server.dto.CartDto;
import com.dawn.server.exceptions.wrapper.CartNotFoundException;
import com.dawn.server.exceptions.wrapper.UserNotFoundException;
import com.dawn.server.helper.CartMappingHelper;
import com.dawn.server.model.Cart;
import com.dawn.server.model.User;
import com.dawn.server.repository.CartRepository;
import com.dawn.server.repository.UserRepository;
import com.dawn.server.service.CartService;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class CartServiceImple implements CartService {

    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CartDto> findAll() {

	return cartRepository.findAll().stream().map(CartMappingHelper::map).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CartDto> findAll(int page, int size, String sortBy, String sortOrder) {
	Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
	Pageable pageable = PageRequest.of(page, size, sort);

	Page<Cart> cartPage = cartRepository.findAll(pageable);
	List<CartDto> cartDtos = cartPage.stream().map(CartMappingHelper::map).toList();

	return new PageImpl<>(cartDtos, pageable, cartPage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public CartDto findById(Integer cartId) {
	return cartRepository.findById(cartId).map(CartMappingHelper::map)

		.orElseThrow(() -> new CartNotFoundException(String.format("Cart with id: %d not found", cartId)));
    }

    @Override
    @Transactional(readOnly = false)
    public CartDto findByUserId(String userId) {
	return cartRepository.findByUser_UserId(userId).map(CartMappingHelper::map).orElseGet(() -> {
	    User user = userRepository.findById(userId)
		    .orElseThrow(() -> new UserNotFoundException(String.format("User with id: %s not found", userId)));
	    Cart newCart = Cart.builder().user(user).cartItems(new HashSet<>()).build();
	    Cart saved = cartRepository.save(newCart);
	    return CartMappingHelper.map(saved);
	});
    }

    @Override
    public CartDto save(CartDto cartDto) {
	Cart cart = CartMappingHelper.map(cartDto);
	Cart saved = cartRepository.save(cart);
	return CartMappingHelper.map(saved);
    }

    @Override
    public CartDto update(Integer cartId, CartDto cartDto) {
	Cart existingCart = cartRepository.findById(cartId)
		.orElseThrow(() -> new CartNotFoundException("Cart with id " + cartId + " not found"));

	Cart updateCart = CartMappingHelper.map(cartDto);
	updateCart.setUser(existingCart.getUser());
	var saved = cartRepository.save(updateCart);

	return CartMappingHelper.map(saved);
    }

    @Override
    public void deleteById(Integer cartId) {
	cartRepository.findById(cartId).ifPresent(cart -> {
	    cartRepository.deleteById(cartId);
	});

    }

}
