import { Component, inject, OnInit } from '@angular/core';
import { CartSummaryComponent } from '../../../shared/components/cart-summary/cart-summary.component';
import { ProductsYouMayLikeComponent } from '../../../shared/components/products-you-may-like/products-you-may-like.component';
import { RouterOutlet } from '@angular/router';
import { CartFacadeService } from '../services/cart/cart-facade.service';

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
export class CartLayoutComponent implements OnInit {

  private readonly _cartFacadeService = inject(CartFacadeService);


  ngOnInit(): void {
    this._cartFacadeService.getCartItems()
  }
}
