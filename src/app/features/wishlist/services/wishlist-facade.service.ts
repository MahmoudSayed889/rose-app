import { inject, Service, signal } from "@angular/core";
import { WishlistItem } from "../models/wishlist";
import { WishlistService } from "./wishlist.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../../shared/services/toast.service";

@Service()
export class WishlistFacadeService {

    private readonly _wishlistService = inject(WishlistService);
    private readonly _translateService = inject(TranslateService);
    private readonly _toastService = inject(ToastService);
    readonly wishlistItems = signal<WishlistItem[]>([]);

    addToWishlist(productId: string | number): void {
        this._wishlistService.addToWishlist(String(productId)).subscribe({
            next: () => {
                this.loadWishlist()
                this._toastService.toaster('success', this._translateService.instant('wishlist.addedToWishlist'));
            },
            error: () => {
                this._toastService.toaster('error', this._translateService.instant('wishlist.addToWishlistError'));
            },
        });
    }

    loadWishlist(): void {
        this._wishlistService.getWishlist().subscribe({
            next: (res) => {
                this.wishlistItems.set(res.payload.wishlistItems);
            },
        });
    }
}