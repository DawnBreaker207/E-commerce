package com.dawn.server.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.dawn.server.dto.CartDto;

public interface CartService {
    List<CartDto> findAll();

    Page<CartDto> findAll(int page, int size, String sortBy, String sortOrder);

    CartDto findById(Integer cartId);

    CartDto save(CartDto cartDto);

    CartDto update(final Integer cartId, final CartDto cartDto);

    void deleteById(final Integer cartId);
}
