import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { SpLineComponent } from "../../shared/components/sp-line/sp-line.component";
import { GalleriaComponent } from "./components/galleria/galleria.component";
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { Product } from '../products/models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface GalleryImage {
  itemImageSrc: string;
  alt: string;
}

@Component({
  selector: 'app-product-details',
  imports: [SpLineComponent, GalleriaComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private _route = inject(ActivatedRoute);
  private _productsService = inject(ProductsService);
  private _destroyRef = inject(DestroyRef);

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
      const galleryArray: string[] = JSON.parse(product.gallery ?? '[]');
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

  getPrice(): number {
    const price = Number(this.productDetails()?.price);
    if (this.productDetails()?.discountType == 'PERCENT') {
      const discountValue = (price * Number(this.productDetails()?.discountValue)) / 100;
      return price - discountValue;
    }
    if (this.productDetails()?.discountType == 'VALUE') {
      return price - Number(this.productDetails()?.discountValue);
    }
    return price;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductDetails();
    });
  }
}
