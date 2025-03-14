import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductsInterface } from '../types/products.interface';
import { JwtHeaderService } from './jwt-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = environment.SERVER;

  constructor(
    private http: HttpClient,
    private jwtHeaderService: JwtHeaderService,
  ) {}

  products = signal<ProductsInterface[]>([]);

  getProducts(): Observable<ProductsInterface[]> {
    this.jwtHeaderService.token = localStorage.getItem('token');
    const headers = this.jwtHeaderService.createHeaders();
    return this.http.get<ProductsInterface[]>(`${this.url}/products`);
  }

  getProductById(id: number): Observable<ProductsInterface> {
    const headers = this.jwtHeaderService.createHeaders();
    console.log(id);
    return this.http.get<ProductsInterface>(`${this.url}/products/${id}`);
  }
}
