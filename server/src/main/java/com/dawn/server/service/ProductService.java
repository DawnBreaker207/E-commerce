package com.dawn.server.service;

import java.util.List;

import com.dawn.server.dto.ProductDto;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findOne(final Long productId);

    ProductDto save(final ProductDto product);

    ProductDto update(final Long productId, final ProductDto product);

    boolean deleteById(final Long productId);
}
