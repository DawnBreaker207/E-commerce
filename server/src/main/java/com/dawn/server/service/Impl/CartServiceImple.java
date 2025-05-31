package com.dawn.server.service.Impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.CartDto;
import com.dawn.server.exceptions.wrapper.CartNotFoundException;
import com.dawn.server.helper.CartMappingHelper;
import com.dawn.server.model.Cart;
import com.dawn.server.repository.CartRepository;
import com.dawn.server.repository.OrderRepository;
import com.dawn.server.service.CartService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class CartServiceImple implements CartService {

    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final OrderServiceImpl orderService;

    @Autowired
    private final OrderRepository orderRepository;

    @Override
    public List<CartDto> findAll() {

	return cartRepository.findAll().stream().map(CartMappingHelper::map).toList();
    }

    @Override
    public Page<CartDto> findAll(int page, int size, String sortBy, String sortOrder) {
	Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
	Pageable pageable = PageRequest.of(page, size, sort);
	
	Page<Cart> cartPage = cartRepository.findAll(pageable);
	List<CartDto> cartDtos = cartPage.stream().map(CartMappingHelper::map).toList();
	
	return new PageImpl<>(cartDtos, pageable, cartPage.getTotalElements());
    }

    @Override
    public CartDto findById(Integer cartId) {
	return cartRepository.findById(cartId).map(CartMappingHelper::map)
		.orElseThrow(() -> new CartNotFoundException(String.format("Cart with id: %id not found", cartId)));
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

	BeanUtils.copyProperties(cartDto, existingCart, "cartId");

	var saved = cartRepository.save(existingCart);

	return CartMappingHelper.map(saved);
    }

    @Override
    public void deleteById(Integer cartId) {
	cartRepository.findById(cartId).ifPresent(cart -> {
	    orderRepository.deleteAllByCart(cart);
	    cartRepository.deleteById(cartId);
	});

    }

}
