import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { CreateOrderRequest, OrderesList, SingleOrder } from '../models/orders';

@Service()
export class OrdersService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseURL = inject(AUTH_API_URL);

    getOrders(): Observable<OrderesList> {
        return this._httpClient.get<OrderesList>(`${this._baseURL}/api/orders`)
    }

    getOrder(id: string): Observable<SingleOrder> {
        return this._httpClient.get<SingleOrder>(`${this._baseURL}/api/orders/${id}`)
    }

    createOrder(data: CreateOrderRequest): Observable<SingleOrder> {
        return this._httpClient.post<SingleOrder>(`${this._baseURL}/api/orders`, data)
    }
}
