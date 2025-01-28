import { Component, inject, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItems } from './../../model/cart-items.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  constructor(public cartService: CartService, private fb: FormBuilder, public loginService:LoginService) {
    this.cartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      creditCard: ['', [Validators.required, Validators.maxLength(16)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.getCartItems();
  }

  shippingCharges: number = 20;


  getTotalPerItemCount(item: CartItems) {
    return Math.round(item.price * item.quantity * 100) / 100;
  }

  getTotalPrice(): number {
    if (this.cartService.CartItemsArray().length > 0) {
      return (
        Math.round(
          this.cartService
            .CartItemsArray()
            .reduce(
              (total, item) => total + this.getTotalPerItemCount(item),
              0
            ) * 100
        ) / 100
      );
    }
    return 0;
  }
  getTotalWithShipping() {
    return (
      Math.round((this.getTotalPrice() + this.getShippingCharges()) * 100) / 100
    );
  }

  removeFromCart() {
    this.cartService.CartItemsArray().filter((item) => item.quantity > 0);
  }
  decreaseQuantity(item: CartItems) {
    item.quantity--;
    if (item.quantity === 0) {
      item.softdelete = true;
      this.removeFromCart();
      this.reloadFunc();
    }
    this.cartService.updateProduct(item).subscribe((data) => {
      // console.log(data);
    });
  }
  increaseQuantity(item: CartItems) {
    item.quantity++;
    this.cartService.updateProduct(item).subscribe((data) => {
      // console.log(data);
    });
  }

  getCartQuantity() {
    return this.cartService
      .CartItemsArray()
      .reduce((total, item) => total + item.quantity, 0);
  }



  async getCartItems () {
    // console.log("about to get CartItems");
    // this.loginService.usernameEmail.subscribe(console.log);
    this.cartService.getAllProducts(this.loginService.usernameEmail.value)?.subscribe((res: CartItems[]) => {
      let alreadyInProductArray: boolean = false;
      // console.log("about to output res")
      // console.log(res)
      res.forEach((item: CartItems) => {
        for (let i = 0; i < this.cartService.CartItemsArray().length; i++) {
          // console.log("about to check if product exist");
          // console.log(item.id === this.cartService.CartItemsArray()[i].id)
          if (item.id === this.cartService.CartItemsArray()[i].id) {
            alreadyInProductArray = true;
            break;
          }
        }

        if (!alreadyInProductArray) {
          // console.log("about to push to the array")
          this.cartService.CartItemsArray().push(item);

          // console.log("after pushing now length is: ")
          // console.log(this.cartService.CartItemsArray().length)
          alreadyInProductArray = false;
        }
      });
    //   console.log( "cartItems array now populated!!")
    //  console.log( this.cartService.CartItemsArray().length)
    });

  }

  specificItemLookup(item: CartItems) {
    return this.cartService
      .CartItemsArray()
      .find((product) => product.id === item.id);
  }

  // updateCartItem(item: CartItems) {
  //   this.cartService.updateProduct(item);
  // }

  // saveCartItem(item: CartItems) {

  //   this.cartService.saveCartProduct(item);
  // }

  reloadFunc() {
    location.reload();
  }

  orderFunct() {
    if (this.cartService.CartItemsArray().length > 0) {
      this.cartService.CartItemsArray().forEach((item) => {
        item.ordered = true;
        this.cartService.updateProduct(item).subscribe((data) => {
          this.reloadFunc();
        });
      });
      alert('Your order has been placed successfully');
    } else {
      alert('Your cart is empty, please add some items to proceed.');
    }
  }

  getShippingCharges() {
    if (this.cartService.CartItemsArray.length > 0) {
      return this.shippingCharges;
    }
    return 0;
  }

  onSubmit() {
    console.warn(this.cartForm.value);
  }

  validateName(name: string): boolean {
    let validRegEx = /^[A-Za-z]+$/;
    return validRegEx.test(name.trim());
  }
  validateCreditCard(creditNumber: string): boolean {
    let validRegex = /^\d+$/;
    if (
      creditNumber.trim().length === 16 ||
      creditNumber.trim().length === 13 ||
      validRegex.test(creditNumber.trim())
    ) {
      return true;
    }
    return false;
  }
  validateDate(date: string): boolean {
    let re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return re.test(date);
  }

  validateCVV(cvv: string): boolean {
    let regex = /^[0-9]{3}$/;
    return regex.test(cvv.trim());
  }
}
