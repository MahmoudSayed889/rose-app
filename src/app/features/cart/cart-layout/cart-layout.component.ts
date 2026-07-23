import { Component } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CartSummaryComponent } from '../../../shared/components/cart-summary/cart-summary.component';
import { ProductsYouMayLikeComponent } from '../../../shared/components/products-you-may-like/products-you-may-like.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart-layout',
  imports: [
    CartSummaryComponent,
    ProductsYouMayLikeComponent,
    RouterOutlet
],
  templateUrl: './cart-layout.component.html',
  styleUrl: './cart-layout.component.scss',
})
export class CartLayoutComponent extends AppComponentBase { }
