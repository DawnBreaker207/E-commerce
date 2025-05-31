package com.dawn.server.helper;

import com.dawn.server.dto.CategoryDto;
import com.dawn.server.dto.ProductDto;
import com.dawn.server.model.Category;
import com.dawn.server.model.Product;

public interface ProductMappingHelper {
    static ProductDto map(final Product product) {
	return ProductDto.builder()
			 .productId(product.getProductId())
			 .productTitle(product.getProductTitle())
			 .imageUrl(product.getImageUrl())
			 .description(product.getDescription())
			 .sku(product.getSku())
			 .quantity(product.getQuantity())
			 .price(product.getPrice())
			 .productDeleted(product.isDeleted())
			 .categoryDto(CategoryDto.builder()
				 	.categoryId(product.getCategory().getCategoryId())
				 	.categoryTitle(product.getCategory().getCategoryTitle())
				 	.imageUrl(product.getCategory().getImageUrl())
					.build())
			.build();
    }

    static Product map(final ProductDto productDto) {
	return Product.builder()
			.productId(productDto.getProductId())
			.productTitle(productDto.getProductTitle())
			.imageUrl(productDto.getImageUrl())
			.sku(productDto.getSku())
			.price(productDto.getPrice())
			.quantity(productDto.getQuantity())
			.description(productDto.getDescription())
			.isDeleted(productDto.getProductDeleted())
			.category(Category.builder()
					.categoryId(productDto.getCategoryDto().getCategoryId())
					.categoryTitle(productDto.getCategoryDto().getCategoryTitle())
					.imageUrl(productDto.getCategoryDto().getImageUrl())
					.build())
			.build();
    }
}
