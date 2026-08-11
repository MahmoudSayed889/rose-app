import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../features/products/services/products.service';
import { Product } from '../../../features/products/models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent, ProductCardComponent } from "reusable-components";
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { AddToCartREQ } from '../../../features/cart/models/cart.interface';
import { CartFacadeService } from '../../../features/cart/services/cart/cart-facade.service';

@Component({
  selector: 'app-products-you-may-like',
  imports: [TitleComponent, CarouselModule, ProductCardComponent],
  templateUrl: './products-you-may-like.component.html',
  styleUrl: './products-you-may-like.component.scss',
})
export class ProductsYouMayLikeComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  private readonly DestroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly cartFacad = inject(CartFacadeService);

  products: WritableSignal<Product[]> = signal([]);

  carouselResponsiveOptions = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  getProductsYouMayLike(): void {
    this.productService.getProductsYouMayLike()
      .pipe(takeUntilDestroyed(this.DestroyRef))
      .subscribe({
        next: (res) => {
          this.products.set(res)
        }
      })
  }

  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1
    }
    this.cartFacad.addToCart(data)
  }

  onCardClick(productId: string): void {
    this.router.navigate(['/product-details', productId])
  }

  ngOnInit(): void {
    this.getProductsYouMayLike();
  }
}
