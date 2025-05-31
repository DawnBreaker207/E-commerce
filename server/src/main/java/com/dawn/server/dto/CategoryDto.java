package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer categoryId;

    private String categoryTitle;

    private String categorySlug;

    private String imageUrl;

    private boolean categoryDeleted;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<ProductDto> products;
}
