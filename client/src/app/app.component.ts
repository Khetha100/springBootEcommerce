import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent,
    LandingPageComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    OrdersComponent,
    ReactiveFormsModule,
    ShoppingComponent,
    RouterModule,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
}
