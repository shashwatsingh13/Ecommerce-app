package com.shashproject.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shashproject.ecommerce.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    
}
