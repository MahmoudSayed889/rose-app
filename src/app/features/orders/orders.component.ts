import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { AppComponentBase } from '../../shared/app-component-base';
import { OrdersService } from './services/orders.service';
import { Order } from './models/orders';
import { OrderCardComponent } from './components/order-card/order-card.component';

@Component({
  selector: 'app-orders',
  imports: [TranslatePipe, SkeletonModule, OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent extends AppComponentBase implements OnInit {
  private readonly _ordersService = inject(OrdersService);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);

  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);
  loaded = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this._ordersService
      .getOrders()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.orders.set(res.payload?.data ?? []);
          this.isLoading.set(false);
          this.loaded.set(true);
        },
        error: () => {
          const errorMsg = this._translateService.instant('orders.loadError');
          this.error.set(errorMsg);
          this._toastService.toaster('error', errorMsg);
          this.isLoading.set(false);
          this.loaded.set(true);
        },
      });
  }

  onRetry(): void {
    this.loadOrders();
  }
}
