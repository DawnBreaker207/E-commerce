package com.dawn.server.helper;

import com.dawn.server.dto.CategoryDto;
import com.dawn.server.model.Category;

public interface CategoryMappingHelper {
    static CategoryDto map(final Category category) {
	return CategoryDto.builder()
			  .categoryId(category.getCategoryId())
			  .categoryTitle(category.getCategoryTitle())
			  .categorySlug(category.getSlug())
			  .imageUrl(category.getImageUrl())
			  .categoryDeleted(category.isDeleted())
			  .build();
    }

    static Category map(CategoryDto categoryDto) {
	return Category.builder()
		       .categoryId(categoryDto.getCategoryId())
		       .categoryTitle(categoryDto.getCategoryTitle())
		       .slug(categoryDto.getCategorySlug())
		       .imageUrl(categoryDto.getImageUrl())
		       .isDeleted(categoryDto.isCategoryDeleted())
		       .build();
    }
}
