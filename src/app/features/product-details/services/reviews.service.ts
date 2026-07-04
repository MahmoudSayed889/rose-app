import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AUTH_API_URL } from 'auth-library';
import { map, Observable } from 'rxjs';
import { BReview, CreateReviewREQ, CreateReviewRES, IReview } from '../models/review.interface';
import { ReviewAdaptor } from './adaptor/review-adaptor.service';

@Service()
export class ReviewsService {
    private _httpClient = inject(HttpClient);
    private baseUrl = inject(AUTH_API_URL);
    private _reviewAdaptor = inject(ReviewAdaptor);

    getProductReviews(productId: string): Observable<IReview[]> {
        const queryParams = new HttpParams().set('productId', productId);
        return this._httpClient.get<BReview>(this.baseUrl + '/api/reviews', { params: queryParams }).pipe(map((res) => this._reviewAdaptor.getProductReviewsAdapt(res)));
    }

    createReview(data: CreateReviewREQ): Observable<IReview> {
        return this._httpClient.post<CreateReviewRES>(this.baseUrl + '/api/reviews', data)
        .pipe(map((res) => this._reviewAdaptor.createReviewAdapt(res)));
    }
}
