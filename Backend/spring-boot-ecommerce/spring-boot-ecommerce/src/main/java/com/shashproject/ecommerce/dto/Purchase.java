package com.shashproject.ecommerce.dto;

import java.util.Set;

import com.shashproject.ecommerce.entity.Address;
import com.shashproject.ecommerce.entity.Customer;
import com.shashproject.ecommerce.entity.Order;
import com.shashproject.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {
    
    private Customer customer;
    private Address shippingAdress;
    private Address  billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
