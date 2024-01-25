package com.shashproject.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shashproject.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
}
