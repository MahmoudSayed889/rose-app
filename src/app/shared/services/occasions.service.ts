import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { HelperService } from './helper.service';

@Service()
export class OccasionsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly helperService = inject(HelperService);

  getAllOccasions(): Observable<any[]> {
    return this.http
      .get<{
        status: boolean;
        code: number;
        payload: {
          data: any[];
          metadata: unknown;
        };
      }>(`${this.baseUrl}/api/occasions`, {
        params: this.helperService.createParams({ limit: 100 }),
      })
      .pipe(map((res) => res.payload.data));
  }
}
