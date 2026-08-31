import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ButtonComponent } from "reusable-components";
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentService } from '../../../services/checkout/payment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppComponentBase } from '../../../../../shared/app-component-base';


@Component({
  selector: 'app-success',
  imports: [ButtonComponent, TranslatePipe, RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent extends AppComponentBase implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly _paymentService = inject(PaymentService);
  private readonly _destroyRef = inject(DestroyRef);



  ngOnInit(): void {
    this.getCheckoutSession()
  }

  getCheckoutSession() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id') as string;

    if (!sessionId) {
      return
    }

    this._paymentService.getCheckoutSession(sessionId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: () => {
        this._toastService.toaster('success', this.isDirRtl() ? 'تمت عملية الدفع بنجاح' : 'Payment successful')
      }
    })
  }
}
