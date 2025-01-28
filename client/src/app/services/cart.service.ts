import { Injectable, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { APIResponseModel, CartItems } from '../model/cart-items.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  CartItemsArray = signal<CartItems[]>([]);
  OrderedItems = signal<CartItems[]>([]);
  subscriptionList: Subscription[] = [];

  apiUrl: string = 'http://localhost:3000/';
  constructor(private http: HttpClient,public loginService:LoginService) { }

  getAllProducts(email:string): Observable<CartItems[]> | undefined {
    const emailObj = {email:email};
    return this.http.post<CartItems[]>(this.apiUrl + 'cartItems', emailObj);
  }

  getAllOrderedProducts(email:string): Observable<CartItems[]> {
    const emailObj = {email:email};
    return this.http.post<CartItems[]>(this.apiUrl + 'ordered', emailObj);
  }

  updateProduct(product: CartItems) {
    return this.http.put<CartItems>(
      this.apiUrl + 'updateCartITem',
      product
    );
  }

  saveCartProduct(product: CartItems) {
    let toUpdate: boolean = false;

    this.CartItemsArray().forEach((itemArray) => {
      if (itemArray.name == product.name) {
        console.log("ENTERED THE IF STATEMENT AS THE PRODUCT ALREADY EXIST IN CART !!!!");
        product.id = itemArray.id;

        product.quantity += itemArray.quantity;
        toUpdate = true;
      }

     })

     if(toUpdate){
      console.log("QUANTITY IS NOW !!!")
      console.log(product.quantity)
       return this.http.put<CartItems>(
        this.apiUrl + 'updateCartITem',
        product
      );


     }

     console.log("COULD NOT BREAK SINCE THE PRODUCT DOES NOT EXIST YET ON CART!!!!!!!!!!!");
    this.loginService.usernameEmail
    return this.http.post<CartItems>(
      this.apiUrl + 'saveCartItem',
      product
    );
  }


}
