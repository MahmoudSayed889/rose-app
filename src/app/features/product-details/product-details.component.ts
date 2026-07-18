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
import { NgxSpinnerService } from 'ngx-spinner';

export interface GalleryImage {
  itemImageSrc: string;
  alt: string;
}

@Component({
  selector: 'app-product-details',
  imports: [SpLineComponent, GalleriaComponent, ProductReviewsComponent, RelatedProductsComponent, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private _route = inject(ActivatedRoute);
  private _productsService = inject(ProductsService);
  private _destroyRef = inject(DestroyRef);
  private readonly _ngxSpinner = inject(NgxSpinnerService);

  productId!: string | null;
  productDetails: WritableSignal<Product | null> = signal(null);
  productImages: WritableSignal<GalleryImage[] | null> = signal(null);

  getProductDetails(): void {
    this._ngxSpinner.show();
    this._productsService.getProduct(this.productId!)
      .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          this.productDetails.set(res.payload.product);
          this.transformProductGallery(this.productDetails()!);
          this._productsService.getPrice(res.payload.product);
          this._ngxSpinner.hide();
        },
        error: () => {
          this._ngxSpinner.hide();
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

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductDetails();
    });
  }
}
