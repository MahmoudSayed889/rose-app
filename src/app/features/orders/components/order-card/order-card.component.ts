import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, input, signal } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Order, OrderItem } from '../../models/orders';
import {
  DELIVERY_CONFIG,
  DeliveryConfig,
  PAYMENT_METHOD_ICONS,
  PAYMENT_STATUS_BADGE_CLASSES,
  PREVIEW_ITEMS_COUNT,
  STATUS_BADGE_CLASSES,
  StatusConfig,
} from './order-card.config';

@Component({
  selector: 'app-order-card',
  imports: [TranslatePipe, DecimalPipe, DatePipe, NgClass, NgTemplateOutlet],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCardComponent {
  private readonly _document = inject(DOCUMENT);
  private readonly _translateService = inject(TranslateService);

  order = input.required<Order>();

  expanded = signal<boolean>(false);

  previewItems = computed<OrderItem[]>(() => this.order().orderItems.slice(0, PREVIEW_ITEMS_COUNT));
  extraItems = computed<OrderItem[]>(() => this.order().orderItems.slice(PREVIEW_ITEMS_COUNT));
  peekItems = computed<OrderItem[]>(() => this.extraItems().slice(0, PREVIEW_ITEMS_COUNT));
  hasExtraItems = computed<boolean>(() => this.extraItems().length > 0);

  private translateOrFallback(key: string, fallback: string): string {
    const translated = this._translateService.instant(key);
    return translated === key ? fallback : translated;
  }

  statusConfig = computed<StatusConfig>(() => {
    const rawStatus = this.order().status ?? '';
    const status = rawStatus.toUpperCase();
    return {
      label: this.translateOrFallback(`orders.statuses.${status}`, rawStatus),
      badgeClass: STATUS_BADGE_CLASSES[status] ?? 'badge-neutral',
    };
  });

  deliveryConfig = computed<DeliveryConfig>(() => {
    const rawStatus = this.order().status ?? '';
    const status = rawStatus.toUpperCase();
    const config = DELIVERY_CONFIG[status] ?? { colorClass: 'delivery-pending', icon: 'pi-truck' };
    return {
      label: this.translateOrFallback(`orders.deliveryStatuses.${status}`, rawStatus),
      colorClass: config.colorClass,
      icon: config.icon,
    };
  });

  paymentStatusLabel = computed<string>(() => {
    const rawStatus = this.order().paymentStatus ?? '';
    const status = rawStatus.toUpperCase();
    return this.translateOrFallback(`orders.paymentStatuses.${status}`, rawStatus);
  });

  paymentStatusBadgeClass = computed<string>(() => {
    const status = (this.order().paymentStatus ?? '').toUpperCase();
    return PAYMENT_STATUS_BADGE_CLASSES[status] ?? 'badge-neutral';
  });

  paymentMethodLabel = computed<string>(() => {
    const rawMethod = this.order().paymentMethod ?? '';
    const method = rawMethod.toUpperCase();
    return this.translateOrFallback(`orders.paymentMethods.${method}`, rawMethod);
  });

  paymentMethodIcon = computed<string>(() => {
    const method = (this.order().paymentMethod ?? '').toUpperCase();
    return PAYMENT_METHOD_ICONS[method] ?? 'pi-wallet';
  });

  toggleExpanded(): void {
    this.expanded.update((value) => !value);
  }
}
