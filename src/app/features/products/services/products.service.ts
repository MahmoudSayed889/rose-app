import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { HelperService } from '../../../shared/services/helper.service';
import { CreateProductRequest, DeleteProductResponse, ProductsList, SingleProduct } from '../models/product';
import { ExternalParams } from '../../../shared/models/external-params';

@Service()
export class ProductsService {

    private _httpClient = inject(HttpClient)
    private baseUrl = inject(AUTH_API_URL)
    private _helperService = inject(HelperService)

    getProducts(params?: ExternalParams): Observable<ProductsList> {
        return this._httpClient.get<ProductsList>(`${this.baseUrl}/api/products`, {params: this._helperService.createParams(params)})
    }

    getProduct(id: string): Observable<SingleProduct> {
        return this._httpClient.get<SingleProduct>(`${this.baseUrl}/api/products/${id}`)
    }
}
