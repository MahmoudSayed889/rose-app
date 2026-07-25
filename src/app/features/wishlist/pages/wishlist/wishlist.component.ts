import { Component, computed, inject, OnInit, signal, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistItem } from '../../models/wishlist';
import { WishlistCardComponent } from '../../components/wishlist-card/wishlist-card.component';
import { WishlistFacadeService } from '../../services/wishlist-facade.service';
import { AddToCartREQ } from '../../../cart/models/cart.interface';
import { CartFacadeService } from '../../../cart/services/cart/cart-facade.service';

@Component({
  selector: 'app-wishlist',
  imports: [WishlistCardComponent, TranslatePipe, ButtonComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent extends AppComponentBase implements OnInit {

  private _wishlistService = inject(WishlistService);
  private _wishlistFacadeService = inject(WishlistFacadeService);
  private _cartFacad = inject(CartFacadeService)
  private _router = inject(Router);
  private readonly _document = inject(DOCUMENT);

  wishlistItems = this._wishlistFacadeService.wishlistItems
  clearingWishlist = signal<boolean>(false);
  removingItemId = signal<string | null>(null);

  isRtl = computed(
    () =>
      this._document.documentElement.dir === 'rtl' ||
      this._document.documentElement.lang === 'ar',
  );

  ngOnInit(): void { }

  onClearWishlist(): void {
    this.clearingWishlist.set(true);
    this._wishlistService.clearWishlist().subscribe({
      next: () => {
        this._wishlistFacadeService.wishlistItems.set([])
        this._wishlistFacadeService.loadWishlist()
        this.clearingWishlist.set(false);
      },
      error: () => {
        this.clearingWishlist.set(false);
      },
    });
  }

  onRemoveItem(wishlistItemId: string): void {
    this.removingItemId.set(wishlistItemId);
    this._wishlistService.removeItem(wishlistItemId).subscribe({
      next: () => {
        this._wishlistFacadeService.wishlistItems.update(items => items.filter(i => i.id !== wishlistItemId));
        this._wishlistFacadeService.loadWishlist()
        this.removingItemId.set(null);
      },
      error: () => {
        this.removingItemId.set(null);
      },
    });
  }

  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1,
    };

    this._cartFacad.addToCart(data);
  }

  get arrowIcon(): string {
    return this.isRtl() ? 'pi-arrow-right' : 'pi-arrow-left';
  }

  navigateToProducts(): void {
    this._router.navigate(['/products']);
  }
}
