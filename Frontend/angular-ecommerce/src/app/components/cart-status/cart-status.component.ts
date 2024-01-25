import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice =0.00;
  totalQuantity=0;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartService();
  }
  updateCartService() {
    // when new events are recieved make the assignment to update the UI
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    );

    // subascribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
