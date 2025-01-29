import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CartItems } from '../types/cartInterface.interface';
import { JwtHeaderService } from './jwt-interceptor.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartItemsArray = signal<CartItems[]>([]);
  OrderedItems = signal<CartItems[]>([]);
  subscriptionList: Subscription[] = [];
  throughCart: boolean = false;

  apiUrl: string = environment.SERVER;
  errorMsg: string = '';
  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    private jwtHeaderService: JwtHeaderService,
    private _router: Router,
  ) {}

  // constructor() {}
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler,
  // ): Observable<HttpEvent<any>> {
  //   return next.handle(req).pipe(
  //     catchError((error) => {
  //       if (error.status == 401) {
  //         console.log("error encountered");
  //       } else {

  //         return Observable.throwError(() => new Error('Your error'));
  //       }
  //     }),
  //   );
  // }

  getAllProducts(): Observable<CartItems[]> {
    this.jwtHeaderService.token = localStorage.getItem('token');
    const headers = this.jwtHeaderService.createHeaders();

    // console.log(headers);
    return this.http.post<CartItems[]>(
      this.apiUrl + '/cartItems',
      {},
      { headers },
    );
  }

  // getAllProducts(): Observable<CartItems[]> | undefined {
  //   // const emailObj = { email: email };
  //   return this.http.get<CartItems[]>(this.apiUrl + 'cartItems');
  // }

  getAllOrderedProducts(): Observable<CartItems[]> {
    this.jwtHeaderService.token = localStorage.getItem('token');
    const headers = this.jwtHeaderService.createHeaders();
    return this.http.post<CartItems[]>(
      this.apiUrl + '/ordered',
      {},
      { headers },
    );
  }

  // getAllOrderedProducts(): Observable<CartItems[]> {
  //   // const emailObj = { email: email };
  //   return this.http.get<CartItems[]>(this.apiUrl + 'ordered');
  // }

  updateProduct(product: CartItems) {
    this.jwtHeaderService.token = localStorage.getItem('token');
    const headers = this.jwtHeaderService.createHeaders();
    return this.http.put<CartItems>(this.apiUrl + '/updateCartITem', product, {
      headers,
    });
  }

  saveCartProduct(product: CartItems) {
    let toUpdate: boolean = false;

    this.CartItemsArray().forEach((itemArray) => {
      if (itemArray.name == product.name) {
        product.id = itemArray.id;

        product.quantity += itemArray.quantity;
        toUpdate = true;
        return;
      }
    });

    if (toUpdate) {
      console.log('Product update to be contacted');
      this.jwtHeaderService.token = localStorage.getItem('token');
      const headers = this.jwtHeaderService.createHeaders();
      return this.http.put<CartItems>(
        this.apiUrl + '/updateCartITem',
        product,
        { headers },
      );
    }

    console.log('about to send to save endpoint');
    console.log(product);
    this.jwtHeaderService.token = localStorage.getItem('token');
    const headers = this.jwtHeaderService.createHeaders();
    return this.http.post<CartItems>(this.apiUrl + '/saveCartItem', product, {
      headers,
    });
  }
}
