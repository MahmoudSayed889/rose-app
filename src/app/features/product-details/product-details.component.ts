import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { SpLineComponent } from "../../shared/components/sp-line/sp-line.component";
import { GalleriaComponent } from "./components/galleria/galleria.component";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { Product } from '../products/models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductReviewsComponent } from "./components/product-reviews/product-reviews.component";
import { TranslatePipe } from '@ngx-translate/core';
import { CartFacadeService } from '../cart/services/cart/cart-facade.service';
import { AddToCartREQ } from '../cart/models/cart.interface';
import { ButtonComponent } from "reusable-components";
import { WishlistFacadeService } from '../wishlist/services/wishlist-facade.service';

export interface GalleryImage {
  itemImageSrc: string;
  alt: string;
}

@Component({
  selector: 'app-product-details',
  imports: [SpLineComponent, GalleriaComponent, ProductReviewsComponent, RelatedProductsComponent, TranslatePipe, ButtonComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private _route = inject(ActivatedRoute);
  private _productsService = inject(ProductsService);
  private _destroyRef = inject(DestroyRef);
  private _cartFacad = inject(CartFacadeService);
  private _wishlistFacadeService = inject(WishlistFacadeService);

  productId!: string | null;
  productDetails: WritableSignal<Product | null> = signal(null);
  productImages: WritableSignal<GalleryImage[] | null> = signal(null);

  getProductDetails(): void {
    this._productsService.getProduct(this.productId!)
      .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          this.productDetails.set(res.payload.product);
          this.transformProductGallery(this.productDetails()!);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  transformProductGallery(product: Product): void {
    try {
      const galleryArray: string[] = JSON.parse(product.gallery);
      const allImages = [product.cover, ...galleryArray];

      const galleriaImages: GalleryImage[] = allImages.map((url, index) => ({
        itemImageSrc: url,
        alt: index === 0
          ? `${product.title} - Main image`
          : `${product.title} - Image ${index}`
      }));

      this.productImages.set(galleriaImages);
    } catch (error) {
      console.error('Error parsing gallery:', error);
    }
  }

  addToCart(): void {
    const data: AddToCartREQ = {
      productId: this.productDetails()?.id!,
      quantity: 1
    }
    this._cartFacad.addToCart(data)
  }

  onFavoriteToggle(productId: string): void {
    this._wishlistFacadeService.addToWishlist(productId)
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductDetails();
    });
  }
}
