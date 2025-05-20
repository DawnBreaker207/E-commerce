package com.dawn.server.service;

import java.util.List;

import com.dawn.server.model.Product;

public interface ProductService {
    List<Product> findAll();
    
    Product findOne(Long productId);
    
    Product save(Product product);
    
    Product update(Long productId, Product product);
    
    boolean deleteById(Long productId);
}
