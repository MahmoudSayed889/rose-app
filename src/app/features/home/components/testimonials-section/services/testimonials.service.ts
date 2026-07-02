import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { TestimonialsList } from '../models/testimonial';
import { ExternalParams } from '../../../../../shared/models/external-params';
import { HelperService } from '../../../../../shared/services/helper.service';

@Service()
export class TestimonialsService {

    private _httpClient = inject(HttpClient)
    private baseUrl = inject(AUTH_API_URL)
    private _helperService = inject(HelperService)

    getTestimonials(params?: ExternalParams): Observable<TestimonialsList> {
        return this._httpClient.get<TestimonialsList>(`${this.baseUrl}/api/testimonials`, {params: this._helperService.createParams(params)})
    }
}
