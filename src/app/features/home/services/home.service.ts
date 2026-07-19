import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { HelperService } from '../../../shared/services/helper.service';
import { ExternalParams } from '../../../shared/models/external-params';
import { CategoryResponse } from '../components/most-popular/models/category';
import { ProductsList } from '../../products/models/product';

@Service()
export class HomeService {
  private _httpClient = inject(HttpClient);
  private baseUrl = inject(AUTH_API_URL);
  private _helperService = inject(HelperService);

  getCategories(params?: ExternalParams): Observable<CategoryResponse> {
    return this._httpClient.get<CategoryResponse>(
      `${this.baseUrl}/api/categories`,
      { params: this._helperService.createParams(params) }
    );
  }

  getProductsByCategory(
    categoryId?: string,
    params?: ExternalParams
  ): Observable<ProductsList> {
    const queryParams = { ...params, categoryId };
    return this._httpClient.get<ProductsList>(`${this.baseUrl}/api/products`, {
      params: this._helperService.createParams(queryParams),
    });
  }
}

// Made with Bob
