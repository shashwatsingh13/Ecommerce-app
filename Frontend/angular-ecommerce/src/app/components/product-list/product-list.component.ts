import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number=1;
  // inject our product services
  constructor(private productService: ProductService, private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
    this.listProducts();
  });
  }
  listProducts() {
    // check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      // get the "id param string, convert string to a number using "+" symbol
      // at the end '!' is used to tell compiler that object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId = 1;
    }
    // method is invoked once its subscribe
    // this method will execute in an Asynchronous fasion
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;        // assign result to a product array
      }
    )
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    // todo ..... real work
    const theCartItem = new CartItem(theProduct);
    
    this.cartService.addToCart(theCartItem);
  }

}
