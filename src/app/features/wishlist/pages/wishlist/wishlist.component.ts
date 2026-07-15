import { Component, computed, inject, OnInit, signal, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  private _ngxSpinner = inject(NgxSpinnerService);
  private readonly _document = inject(DOCUMENT);

  wishlistItems = signal<WishlistItem[]>([]);

  isRtl = computed(
    () =>
      this._document.documentElement.dir === 'rtl' ||
      this._document.documentElement.lang === 'ar',
  );

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this._ngxSpinner.show();
    this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        this._ngxSpinner.hide();
        this.wishlistItems.set(res.payload.wishlistItems);
      },
      error: () => {
        this._ngxSpinner.hide();
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
