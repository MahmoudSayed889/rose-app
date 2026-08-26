import { MainResponse } from '../../../../shared/models/main-response';

export interface CreatePaymentIntentRequest {
  orderId: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

export type PaymentResponse = MainResponse<string>;
