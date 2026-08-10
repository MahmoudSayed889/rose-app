import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import {
  ConfirmPaymentRequest,
  CreatePaymentIntentRequest,
  PaymentResponse,
} from '../../models/checkout/payment';

@Service()
export class PaymentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseURL = inject(AUTH_API_URL);

  createPaymentIntent(data: CreatePaymentIntentRequest): Observable<PaymentResponse> {
    return this._httpClient.post<PaymentResponse>(
      `${this._baseURL}/api/payments/create-intent`,
      data,
    );
  }

  confirmPayment(data: ConfirmPaymentRequest): Observable<PaymentResponse> {
    return this._httpClient.post<PaymentResponse>(`${this._baseURL}/api/payments/confirm`, data);
  }
}
