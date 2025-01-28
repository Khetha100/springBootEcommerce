import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] | null = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the observable
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Fetched products:', products);
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        // this.products = null;
      },
    });
  }

  logProduct(product: Product) {
    console.log('Product object: ', product);
  }

  showProductDetails(productId: number | undefined): void {
    console.log('Navigating with Product ID: ', productId);
    if (productId === undefined) {
      console.error('Product ID is undefined!');
      return;
    }
    this.router.navigate([`/products/${productId}`]);
  }
}
