export interface StatusConfig {
  label: string;
  badgeClass: string;
}

export interface DeliveryConfig {
  label: string;
  colorClass: string;
  icon: string;
}

export const STATUS_BADGE_CLASSES: Record<string, string> = {
  PENDING: 'badge-pending',
  IN_PROGRESS: 'badge-progress',
  PROCESSING: 'badge-progress',
  SHIPPED: 'badge-progress',
  DELIVERED: 'badge-success',
  COMPLETED: 'badge-success',
  CANCELED: 'badge-danger',
  CANCELLED: 'badge-danger',
};

export const DELIVERY_CONFIG: Record<string, { colorClass: string; icon: string }> = {
  PENDING: { colorClass: 'delivery-pending', icon: 'pi-truck' },
  IN_PROGRESS: { colorClass: 'delivery-pending', icon: 'pi-truck' },
  PROCESSING: { colorClass: 'delivery-pending', icon: 'pi-truck' },
  SHIPPED: { colorClass: 'delivery-shipped', icon: 'pi-truck' },
  DELIVERED: { colorClass: 'delivery-success', icon: 'pi-check-circle' },
  COMPLETED: { colorClass: 'delivery-success', icon: 'pi-check-circle' },
  CANCELED: { colorClass: 'delivery-danger', icon: 'pi-exclamation-triangle' },
  CANCELLED: { colorClass: 'delivery-danger', icon: 'pi-exclamation-triangle' },
};

export const PAYMENT_STATUS_BADGE_CLASSES: Record<string, string> = {
  PAID: 'badge-success',
  PENDING: 'badge-pending',
  UNPAID: 'badge-danger',
  FAILED: 'badge-danger',
  REFUNDED: 'badge-pending',
};

export const PAYMENT_METHOD_ICONS: Record<string, string> = {
  CASH: 'pi-money-bill',
  CASH_ON_DELIVERY: 'pi-money-bill',
  CARD: 'pi-credit-card',
  CREDIT_CARD: 'pi-credit-card',
  STRIPE: 'pi-credit-card',
};

export const PREVIEW_ITEMS_COUNT = 2;
