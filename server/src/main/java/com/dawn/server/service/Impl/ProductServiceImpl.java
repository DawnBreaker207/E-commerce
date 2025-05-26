package com.dawn.server.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.ProductDto;
import com.dawn.server.exceptions.wrapper.ProductNotFoundException;
import com.dawn.server.helper.ProductMappingHelper;
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
    public List<ProductDto> findAll() {
	var products = productRepository.findAll();
	return products.stream().map(ProductMappingHelper::map).distinct().collect(Collectors.toList());
    }

    @Override
    public ProductDto findOne(Long productId) {
	return productRepository.findById(productId).map(ProductMappingHelper::map).orElseThrow(
		() -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));
    }

    @Override
    public ProductDto save(ProductDto productDto) {
	var product = ProductMappingHelper.map(productDto);
	var saved = productRepository.save(product);

	return ProductMappingHelper.map(saved);

    }

    @Override
    public ProductDto update(Long productId, ProductDto productDto) {
	try {
	    Product existingProduct = productRepository.findById(productId).orElseThrow(
		    () -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));

	    var product = ProductMappingHelper.map(productDto);
		var saved = productRepository.save(product);
		return ProductMappingHelper.map(saved);
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	} catch (Exception e) {
	    throw new ProductNotFoundException(String.format("Error updating product", productId));
	}
    }

    @Override
    public boolean deleteById(Long productId) {
	try {
	    productRepository.deleteById(productId);
	    return true;
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	}

    }

}
