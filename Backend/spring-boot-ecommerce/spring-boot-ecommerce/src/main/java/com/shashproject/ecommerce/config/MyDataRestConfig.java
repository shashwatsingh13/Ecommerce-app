package com.shashproject.ecommerce.config;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.shashproject.ecommerce.entity.Country;
import com.shashproject.ecommerce.entity.Product;
import com.shashproject.ecommerce.entity.ProductCategory;
import com.shashproject.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
         entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors ){
    
        HttpMethod[] theunsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        // disable HTTP methods for Product: PUT, POST and DELETE
        disableHttpMethods(Product.class, config, theunsupportedActions);
        // disable HTTP methods for ProductCategory: PUT, POST and DELETE
        disableHttpMethods(ProductCategory.class, config, theunsupportedActions);
        
        // disable HTTP methods for Country: PUT, POST and DELETE
        disableHttpMethods(Country.class, config, theunsupportedActions);
        // disable HTTP methods for State: PUT, POST and DELETE
        disableHttpMethods(State.class, config, theunsupportedActions);

        // call an internal helper method
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theunsupportedActions) {
        config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure((metdata,HttpMethods)-> HttpMethods.disable(theunsupportedActions))
        .withCollectionExposure((metdata, HttpMethods)-> HttpMethods.disable(theunsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        
        // expose entity ids

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the enitiy types
        List<Class> entityClasses = new ArrayList<>();

        // - get the eneitity types for the entities
        for(EntityType temEntityType : entities){
            entityClasses.add(temEntityType.getJavaType());
        }

        // - expose the enitity ids for the array of enitity/domain type
        Class[] domainTypes =entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
    
}
