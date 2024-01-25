package com.shashproject.ecommerce.service;

import com.shashproject.ecommerce.dto.Purchase;
import com.shashproject.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    
    PurchaseResponse placeOrder(Purchase purchase);
}
