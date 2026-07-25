import { Component, inject, OnInit, signal } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductsService } from '../../services/products.service';
import { ExternalParams } from '../../../../shared/models/external-params';
import { Product, ProductsList } from '../../models/product';
import { PaginatorComponent, ProductCardComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/types/paginator';

import { AddToCartREQ } from '../../../cart/models/cart.interface';
import { CartFacadeService } from '../../../cart/services/cart/cart-facade.service';
import { WishlistFacadeService } from '../../../wishlist/services/wishlist-facade.service';

@Component({
  selector: 'app-products',
  imports: [
    FilterComponent,
    ProductCardComponent,
    PaginatorComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends AppComponentBase implements OnInit {

  private _productsService = inject(ProductsService)
  private _cartFacad = inject(CartFacadeService)
  private _router = inject(Router)
  private readonly _wishlistFacadeService = inject(WishlistFacadeService);

  products = signal<Product[]>([])

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    const params = {
      page: this.paginator().page,
      limit: this.paginator().limit
    } as ExternalParams
    this._productsService.getProducts(params).subscribe({
      next: (res: ProductsList) => {
        this.products.set(res.payload.data)

        this.paginator.set({
          page: res.payload.metadata.page,
          limit: res.payload.metadata.limit,
          total: res.payload.metadata.total,
          totalPages: res.payload.metadata.totalPages,
        })
      }
    })
  }

  onFavoriteToggle(productId: string | number): void {
    this._wishlistFacadeService.addToWishlist(productId)
  }
  
  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1,
    };
  
    this._cartFacad.addToCart(data);
  }

  logFavoriteToggle(productId: string | number): void {
    console.log('favoriteToggle', productId);
  }

  logCardClick(productId: string | number): void {
    console.log('cardClick', productId);
    this._router.navigate(['/product-details', productId])
  }

  onPageChange(event: PaginatorState) {
    this.paginator.update(p => ({
      ...p,
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? p.limit
    }));

    this.getProducts();
  }
}
