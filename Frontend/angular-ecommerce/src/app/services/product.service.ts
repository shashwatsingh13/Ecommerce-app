import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl ="http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  // return an Observable { map the json data from spring Data REST to product array}
  getProductList(theCategoryId?: number): Observable<Product[]> {
       // need to build URL based on category id 
       const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    // call rest API and returns an observable 
    // Maps the JSON data from Spring Data REST to ProductCategory array
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
     map(response => response._embedded.productCategory)
    );
  }
}

// unwrap the json from spring data REST _embedded entry
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
}

interface GetResponseProductCategory{
  // unwrap the json from spring data REST _embedded entry
  _embedded:{
    productCategory: ProductCategory[];
  }
}