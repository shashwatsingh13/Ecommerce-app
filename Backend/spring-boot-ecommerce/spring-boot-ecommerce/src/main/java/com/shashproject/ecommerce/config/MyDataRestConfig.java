package com.shashproject.ecommerce.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.shashproject.ecommerce.entity.Product;
import com.shashproject.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors ){
    
        HttpMethod[] theunsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        // disable HTTP methods for Product: PUT, POST and DELETE
        config.getExposureConfiguration()
        .forDomainType(Product.class)
        .withItemExposure((metdata,HttpMethods)-> HttpMethods.disable(theunsupportedActions))
        .withCollectionExposure((metdata, HttpMethods)-> HttpMethods.disable(theunsupportedActions));

        // disable HTTP methods for ProductCategory: PUT, POST and DELETE
        config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metdata,HttpMethods)-> HttpMethods.disable(theunsupportedActions))
        .withCollectionExposure((metdata, HttpMethods)-> HttpMethods.disable(theunsupportedActions));
    }
    
}
