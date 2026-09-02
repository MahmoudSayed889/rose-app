import { MainResponse } from '../../../../shared/models/main-response';

export interface CreatePaymentIntentRequest {
  orderId: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface CheckoutSessionReq {
  orderId: string
}

export type CheckoutSessionRes = MainResponse<CheckoutSessionResPayload>;
export interface CheckoutSessionResPayload {
  checkoutUrl: string
  sessionId: string
  expiresAt: string
  reused: boolean
}

export type GetCheckoutSessionRes = MainResponse<GetCheckoutSessionResPayload>;

export interface GetCheckoutSessionResPayload {
  checkoutUrl: string
  sessionId: string
  expiresAt: string
  reused: boolean
}
export interface Payload {
  sessionId: string
  paymentStatus: string
  sessionStatus: string
  amountTotal: number
  currency: string
  order: Order
}
export interface Order {
  orderId: string
  paymentStatus: string
}

export type PaymentResponse = MainResponse<string>;
