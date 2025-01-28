import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Product } from '../../model/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../model/cart-items.model';
import { LoginService } from '../../services/login.service';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  product: Product | null = null;





  constructor(public cartService:CartService, public loginService: LoginService, private router: Router){
    // this.subsc();
    // const previousUrl = history.state.prevPage ?? null;
    // if (!previousUrl) {
    //   console.log('page was refreshed!');
    // } else {
    //   console.log('I came here from: ', previousUrl);
    // }
  }



// two new subscribers will get initial value => output: 123, 123



  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Route params: ', params);
      const productId = Number(params['id']);
      if (!isNaN(productId)) {
        this.productService.getProduct(productId).subscribe(
          (products) => {
            if (Array.isArray(products) && products.length > 0)
              this.product = products[0]; // Assuming `getProduct` returns a single product object.
            console.log('Product fetched: ', this.product);
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.error('Invalid product ID');
      }
    });
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }

  addToCart() {
    if (this.product) {
      alert(`Product "${this.product.name}" added to cart!`);
      let username = this.loginService.usernameEmail.value;
      let softDelete = false;
      let ordered = false;
      let quantity = 1;

      const {id,name,short_description,price,thumbnail_url} = this.product
      let cartItem: CartItems = {
        id,
        username,
        name: name,
        description: short_description,
        price:price,
        quantity:quantity,
        imageurl: thumbnail_url,
        softdelete: softDelete,
        ordered: ordered
      }
      this.router.navigate(['/cart']);
      this.cartService.saveCartProduct(cartItem)?.subscribe();
      this.router.navigate(['/cart']);
      

    } else {
      alert('Product details are not available');
    }
  }

  alertFunc(){
    alert("Pleasen sign in to add products");
  }
}
