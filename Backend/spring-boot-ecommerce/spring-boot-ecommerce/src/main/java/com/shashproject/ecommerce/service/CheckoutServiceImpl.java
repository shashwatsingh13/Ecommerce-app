package com.shashproject.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.shashproject.ecommerce.dao.CustomerRepository;
import com.shashproject.ecommerce.dto.Purchase;
import com.shashproject.ecommerce.dto.PurchaseResponse;
import com.shashproject.ecommerce.entity.Customer;
import com.shashproject.ecommerce.entity.Order;
import com.shashproject.ecommerce.entity.OrderItem;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl  implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase){

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = genrateOrderTrackingNumber();
        order.setOrderTrackingNumber((orderTrackingNumber));
        
        // populate order with  orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with shipping address
        order.setShippingAddress(purchase.getShippingAdress());
        order.setBillingAddress(purchase.getBillingAddress());

        // populate cutomer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        customerRepository.save(customer);


        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String genrateOrderTrackingNumber() {
        // generate a unique id
        // generate a rnadom UUID number(UUID version-4)
        return UUID.randomUUID().toString();
    }
    
}
