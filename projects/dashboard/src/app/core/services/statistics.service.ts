import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import {
  DashboardPayload,
  DashboardResponse,
} from '../models/dashboard.models';

export interface StatisticsParams {
  revenuePeriod: 'monthly' | 'weekly';
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);

  getStatistics(params: StatisticsParams): Observable<DashboardPayload> {
    return this.http
      .get<DashboardResponse>(`${this.baseUrl}/api/admin/statistics`, {
        params: { ...params },
      })
      .pipe(map((res) => res.payload));
  }
}
