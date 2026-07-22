import { Component, computed, DestroyRef, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { AppComponentBase } from '../../app-component-base';
import { DecimalPipe, NgClass } from '@angular/common';
import { CartFacadeService } from '../../../features/cart/services/cart/cart-facade.service';
import { RouterLink } from "@angular/router";
import { CheckoutFacadeService } from '../../../features/cart/services/checkout/checkout-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coupon } from '../../../features/cart/models/coupon';
import { FormsModule } from "@angular/forms";
import { DividerModule } from 'primeng/divider';
import { ExternalParams } from '../../models/external-params';

@Component({
  selector: 'app-cart-summary',
  imports: [InputComponent, DecimalPipe, ButtonComponent, RouterLink, FormsModule, NgClass, DividerModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent extends AppComponentBase implements OnInit {
  private readonly _cartFacadeService = inject(CartFacadeService);
  private readonly _checkoutFacadeService = inject(CheckoutFacadeService);
  private readonly _destroyRef = inject(DestroyRef);

  currentStep = this._checkoutFacadeService.currentStep;

  subtotal = this._cartFacadeService.subtotal
  total = this._cartFacadeService.total

  discount = signal<number>(0)

  couponCode: string = ''
  allCoupons = signal<Coupon[]>([])
  appliedCoupons = signal<Coupon[]>([])

  ngOnInit(): void {
    this.getCoupons()
  }

  getCoupons() {
    const params = {
      isActive: true
    } as ExternalParams

    this._cartFacadeService.getCoupons(params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.allCoupons.set(res.payload.data);
        }
      })
  }

  applyCoupon() {
    const foundCoupon = this.allCoupons().find(
      c => c.code.toLowerCase() === this.couponCode.trim().toLowerCase()
    );

    if (!foundCoupon) {
      this._toastService.toaster('error', this.isDirRtl() ? 'لم يتم العثور على القسيمة' : 'Coupon not found')
      return;
    }

    if (this.appliedCoupons().some(c => c.code === foundCoupon.code)) {
      this._toastService.toaster('info', this.isDirRtl() ? 'تم تطبيق هذة القسيمة بالفعل' : 'This coupon has already been applied')
      return;
    }

    this.appliedCoupons.update(coupons => [...coupons, foundCoupon]);
    this.calcTotoalAndDiscount()
    this.couponCode = '';
  }

  calcTotoalAndDiscount() {

    if (!this._cartFacadeService.cartItems().length) {
      return
    }

    let discount = 0;

    for (const coupon of this.appliedCoupons()) {

      if (this.subtotal() < Number(coupon.minPurchase)) {
        this.appliedCoupons.set([])
        this._toastService.toaster(
          'info',
          this.isDirRtl() ? 'اجمالي المشتريات اقل من الحد الادنى للمشتريات لهذة القسيمة' : 'The total purchase is less than the minimum purchase amount for this coupon.'
        )
        continue;
      }

      if (coupon.type === 'PERCENT') {

        let value =
          this.subtotal() * Number(coupon.value) / 100;

        if (coupon.maxDiscount) {
          value = Math.min(value, Number(coupon.maxDiscount));
        }

        discount += value;

      } else {

        discount += Number(coupon.value);

      }
    }

    this.discount.set(discount)
    this.total.set(Number(Math.max(0, this.total() - this.discount())))
  }
}
