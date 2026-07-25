import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { Address, AddressesList, CreateAddressRequest, DeleteAddressResponse, SingleAddress } from '../../models/checkout/addresses';

@Service()
export class AddressService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseURL = inject(AUTH_API_URL);

    readonly addresses = signal<Address[]>([]);

    getAddresses(): Observable<AddressesList> {
        return this._httpClient.get<AddressesList>(`${this._baseURL}/api/addresses`)
    }

    getAddress(id: string): Observable<SingleAddress> {
        return this._httpClient.get<SingleAddress>(`${this._baseURL}/api/addresses/${id}`)
    }

    createAddress(data: CreateAddressRequest): Observable<SingleAddress> {
        return this._httpClient.post<SingleAddress>(`${this._baseURL}/api/addresses`, data)
    }

    updateAddress(id: string, data: CreateAddressRequest): Observable<SingleAddress> {
        return this._httpClient.patch<SingleAddress>(`${this._baseURL}/api/addresses/${id}`, data)
    }

    deleteAddress(id: string): Observable<DeleteAddressResponse> {
        return this._httpClient.delete<DeleteAddressResponse>(`${this._baseURL}/api/addresses/${id}`)
    }
}
