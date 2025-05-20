package com.dawn.server.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dawn.server.exceptions.wrapper.ProductNotFoundException;
import com.dawn.server.model.Product;
import com.dawn.server.repository.ProductRepository;
import com.dawn.server.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
	return productRepository.findAll();
    }

    @Override
    public Product findOne(Long productId) {
	return productRepository.findById(productId).orElseThrow(
		() -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));
    }

    @Override
    public Product save(Product product) {
	return productRepository.save(product);
    }

    @Override
    public Product update(Long productId, Product product) {
	try {
	    Product existingProduct = productRepository.findById(productId).orElseThrow(
		    () -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));

	    return productRepository.save(product);
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	} catch (Exception e) {
	    throw new ProductNotFoundException(String.format("Error updating product", productId));
	}
    }

    @Override
    public void deleteById(Long productId) {
	try {
	    productRepository.deleteById(productId);
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	}

    }

}
