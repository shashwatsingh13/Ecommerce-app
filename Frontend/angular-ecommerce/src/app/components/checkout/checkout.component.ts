import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
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
              private cartService: CartService) { }

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
    console.log(this.checkoutFormGroup.get('customer').value);

    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  
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