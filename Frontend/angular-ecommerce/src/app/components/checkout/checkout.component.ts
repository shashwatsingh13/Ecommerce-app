import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopHereFormService } from 'src/app/services/shop-here-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  

  constructor(private formBuilder: FormBuilder,
              private shopHereFormService: ShopHereFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        houseNo:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      })
      // add billing addrss and card details here
    });
  
  
  // populate countries
  
  this.shopHereFormService.getCountries().subscribe(
    data=>{
      console.log("Retrieved countries: " +JSON.stringify(data));
      this.countries = data;
    }
  );
  }
  reviewCartDetails() {
    
    // subscribe to cartservice.totalQuantity
      
      this.cartService.totalQuantity.subscribe(
        totalQuantity=>this.totalQuantity=totalQuantity
      );
      

    // subscribe to cartservice.totalprice

    this.cartService.totalPrice.subscribe(
      totalPrice=>this.totalPrice = totalPrice
    );
  }

  onSubmit(){

    console.log("Handling the submit buttom");

    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    //-- long way
    // let orderItems: OrderItem[] =[];
    // for(let i=0; i<cartItems.length; i++){
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }

    // - short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));    

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    // populate purchase - shipping Addresss
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing Address
    // purchase.billingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    // const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    // const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    // purchase.shippingAddress.state = billingState.name;
    // purchase.shippingAddress.country = billingState.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response =>{
          alert(`Your order has been received.\n Order tracking number: ${response.orderTrackingNumber}`);
          // reset cart
          this.resetCart();
        },
        error: err=>{
          alert(`There was an error: ${err.message}`);
        }
      }
    );


    console.log(this.checkoutFormGroup.get('customer').value);

    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  
  }
  resetCart() {
    // reset cart data
    this.cartService.cartItems =[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${ formGroupName } country code: ${countryCode}`);
    console.log(`${ formGroupName } country name: ${countryName}`);

    this.shopHereFormService.getStates(countryCode).subscribe(
      data =>{
        // here billing address functionality comes
         if(formGroupName === 'shippingAddress'){
           this.shippingAddressStates=data;
         }
       
        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}