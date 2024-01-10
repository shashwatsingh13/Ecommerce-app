package com.shashproject.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shashproject.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product , Long>{
    
    
}
