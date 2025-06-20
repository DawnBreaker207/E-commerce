package com.dawn.server.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.ProductDto;
import com.dawn.server.exceptions.wrapper.ProductNotFoundException;
import com.dawn.server.helper.CategoryMappingHelper;
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
    public static final String PRODUCT_CACHE = "product";
    @Autowired
    private final ProductRepository productRepository;

    
    @Override
    @Cacheable(value = PRODUCT_CACHE)
    public List<ProductDto> findAll() {
	var products = productRepository.findAll();
	return products.stream().map(ProductMappingHelper::map).distinct().collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = PRODUCT_CACHE, key = "#productId")
    public ProductDto findOne(Integer productId) {
	return productRepository.findById(productId).map(ProductMappingHelper::map).orElseThrow(
		() -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));
    }

    @Override
    @CachePut(value = PRODUCT_CACHE, key = "#result.id()")
    public ProductDto save(ProductDto productDto) {
	var product = ProductMappingHelper.map(productDto);
	var saved = productRepository.save(product);

	return ProductMappingHelper.map(saved);

    }

    @Override
    @CachePut(value = PRODUCT_CACHE, key = "#result.id()")
    public ProductDto update(Integer productId, ProductDto productDto) {
	try {
	    Product existingProduct = productRepository.findById(productId).orElseThrow(
		    () -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));

	    BeanUtils.copyProperties(productDto, existingProduct, "productId", "category");
	    
	    if(productDto.getCategoryDto() != null) {
		existingProduct.setCategory(CategoryMappingHelper.map(productDto.getCategoryDto()));
	    }
	    var saved = productRepository.save(existingProduct);
	    return ProductMappingHelper.map(saved);
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	} catch (Exception e) {
	    throw new RuntimeException(String.format("Error updating product with id[%d}", productId));
	}
    }

    @Override
    @CacheEvict(value = PRODUCT_CACHE, key = "#productId")
    public boolean deleteById(Integer productId) {
	try {
	    productRepository.deleteById(productId);
	    return true;
	} catch (ProductNotFoundException e) {
	    throw new ProductNotFoundException(String.format("Product with id[%d] not found", productId));
	}

    }

}
