import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { AppComponentBase } from '../../shared/app-component-base';
import { OrdersService } from './services/orders.service';
import { Order } from './models/orders';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { PaymentService } from '../cart/services/checkout/payment.service';
import { ToastService } from '../../shared/services/toast.service';

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
  private readonly _paymentService = inject(PaymentService);

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

  payOrder(orderId: string): void {
    const dataToSend = {
      orderId: orderId
    }

    this._paymentService.CheckoutSession(dataToSend).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        // console.log(res);
        window.location.href = res.payload.checkoutUrl;
      }
    })

  }

  getCheckoutSession(sessionId: string) {
    this._paymentService.getCheckoutSession(sessionId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: () => {
        this._toastService.toaster('success', this.isDirRtl() ? 'تمت عملية الدفع بنجاح' : 'Payment successful')
      }, error: () => {

      }
    })
  }


  onRetry(): void {
    this.loadOrders();
  }
}
