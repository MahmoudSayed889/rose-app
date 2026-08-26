import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { CategoriesList, Category } from '../components/category-card/category.interface';
import { HelperService } from './helper.service';
import { CategoriesList } from '../../features/categories/models/category';

@Service()
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly helperService = inject(HelperService);

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<CategoriesList>(`${this.baseUrl}/api/categories`, {
        params: this.helperService.createParams({ limit: 100 }),
      })
      .pipe(
        map((res) => res.payload.data.filter((c) => c._count.products > 0)),
      );
  }
}
