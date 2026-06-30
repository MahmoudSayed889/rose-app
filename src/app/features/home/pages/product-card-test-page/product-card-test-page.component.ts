import { Component } from '@angular/core';
import {
  ProductCardBadge,
  ProductCardComponent,
} from 'reusable-components';

interface ProductCardTestItem {
  productId: string | number;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  badge: ProductCardBadge | null;
  isFavorite: boolean;
}

@Component({
  selector: 'app-product-card-test-page',
  imports: [ProductCardComponent],
  templateUrl: './product-card-test-page.component.html',
  styleUrl: './product-card-test-page.component.scss',
})
export class ProductCardTestPageComponent {
  readonly products: ProductCardTestItem[] = [
    {
      productId: 1,
      imageUrl: '/assets/imgs/product1.jpg',
      title:
        'Wireless Bluetooth Headphones with Extra Long Product Name to Test Truncation',
      price: 299,
      rating: 4.5,
      badge: null,
      isFavorite: false,
    },
    {
      productId: 2,
      imageUrl: '/assets/imgs/product1.jpg',
      title: 'Smart Watch Pro',
      price: 599,
      rating: 5,
      badge: 'new',
      isFavorite: true,
    },
    {
      productId: 3,
      imageUrl: '/assets/imgs/product1.jpg',
      title: 'Gaming Mouse',
      price: 149,
      rating: 3,
      badge: 'hot',
      isFavorite: false,
    },
    {
      productId: 4,
      imageUrl: '/assets/imgs/product1.jpg',
      title: 'Mechanical Keyboard',
      price: 399,
      rating: 4,
      badge: 'out-of-stock',
      isFavorite: false,
    },
    {
      productId: 5,
      imageUrl: '/assets/imgs/product1.jpg',
      title: 'USB-C Hub',
      price: 89,
      rating: 0,
      badge: null,
      isFavorite: false,
    },
  ];

  logFavoriteToggle(productId: string | number): void {
    console.log('favoriteToggle', productId);
  }

  logAddToCart(productId: string | number): void {
    console.log('addToCart', productId);
  }

  logCardClick(productId: string | number): void {
    console.log('cardClick', productId);
  }
}
