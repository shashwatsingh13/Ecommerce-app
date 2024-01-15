package com.shashproject.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.shashproject.ecommerce.entity.Product;

// accepts call from web brower scripts we use crossorigin annotation
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product , Long>{
    
    
}
