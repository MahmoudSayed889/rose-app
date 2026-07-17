import { Component, computed, inject, OnInit, signal, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistItem } from '../../models/wishlist';
import { WishlistCardComponent } from '../../components/wishlist-card/wishlist-card.component';

@Component({
  selector: 'app-wishlist',
  imports: [WishlistCardComponent, TranslatePipe, ButtonComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent extends AppComponentBase implements OnInit {

  private _wishlistService = inject(WishlistService);
  private _router = inject(Router);
  private readonly _document = inject(DOCUMENT);

  wishlistItems = signal<WishlistItem[]>([]);
  clearingWishlist = signal<boolean>(false);
  removingItemId = signal<string | null>(null);

  isRtl = computed(
    () =>
      this._document.documentElement.dir === 'rtl' ||
      this._document.documentElement.lang === 'ar',
  );

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems.set(res.payload.wishlistItems);
      },
      error: () => {
      },
    });
  }

  onClearWishlist(): void {
    this.clearingWishlist.set(true);
    this._wishlistService.clearWishlist().subscribe({
      next: () => {
        this.wishlistItems.set([]);
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
        this.wishlistItems.update(items => items.filter(i => i.id !== wishlistItemId));
        this.removingItemId.set(null);
      },
      error: () => {
        this.removingItemId.set(null);
      },
    });
  }

  get arrowIcon(): string {
    return this.isRtl() ? 'pi-arrow-right' : 'pi-arrow-left';
  }

  navigateToProducts(): void {
    this._router.navigate(['/products']);
  }
}
