import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem){

    //check if we already have item in cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0){
    // find the item in the cart based in item id

    // for(let tempCartItem of this.cartItems){
    //   if(tempCartItem.id === theCartItem.id){
    //     existingCartItem = tempCartItem;
    //     break;
    //  }}
    // Refactoring the uper code...
    existingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      
    
    
    // check if we found it
    alreadyExistInCart = (existingCartItem != undefined);
  }
  if(alreadyExistInCart)
  {
    // increase the quantity
    existingCartItem.quanitity++;
  }
  else{
    // just add the item to the array
    this.cartItems.push(theCartItem);
  }
  // compute cart total price and total quantity
  this.computeCartTotals();
}
  computeCartTotals() {
    
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quanitity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quanitity;
    }

    // publish the new values ..... all subscribers will recieve the new data
    // .next is used to publish/send the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debuggung purpose
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantitiyValue: number){
    console.log('content of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quanitity * tempCartItem.unitPrice;
      console.log(`name= ${tempCartItem.name}, quantity=${tempCartItem.quanitity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice= ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantitiyValue}`);
    console.log('----------');
  }
}
