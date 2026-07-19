import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { HelperService } from '../../../shared/services/helper.service';
import {
  CreateProductRequest,
  DeleteProductResponse,
  Product,
  SingleProduct,
} from '../models/product';

@Service()
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly helperService = inject(HelperService);

  getProducts(
    page: number = 1,
    limit: number = 20,
  ): Observable<{
    data: Product[];
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return this.http
      .get<{
        status: boolean;
        code: number;
        payload: {
          data: Product[];
          metadata: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
          };
        };
      }>(`${this.baseUrl}/api/products`, {
        params: this.helperService.createParams({ page, limit }),
      })
      .pipe(map((res) => res.payload));
  }

  getProduct(id: string): Observable<SingleProduct> {
    return this.http.get<SingleProduct>(`${this.baseUrl}/api/products/${id}`);
  }

  createProduct(data: CreateProductRequest): Observable<SingleProduct> {
    return this.http.post<SingleProduct>(`${this.baseUrl}/api/products`, data);
  }

  updateProduct(
    id: string,
    data: CreateProductRequest,
  ): Observable<SingleProduct> {
    return this.http.put<SingleProduct>(
      `${this.baseUrl}/api/products/${id}`,
      data,
    );
  }

  deleteProduct(id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.baseUrl}/api/products/${id}`,
    );
  }
}
