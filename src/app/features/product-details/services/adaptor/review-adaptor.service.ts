import { Service, WritableSignal } from '@angular/core';
import { BReview, CreateReviewRES, IReview } from '../../models/review.interface';

@Service()
export class ReviewAdaptor {
    getProductReviewsAdapt(data: BReview): IReview[] {
        if (!data?.payload?.data) {
            return [];
        }
        return data.payload.data.map((rev) => {
            return {
                id: rev.id,
                userId: rev.userId,
                productId: rev.productId,
                content: rev.content,
                createdAt: rev.createdAt,
                headline: rev.headline,
                product: rev.product,
                rating: rev.rating,
                updatedAt: rev.updatedAt,
                user: rev.user
            };
        });
    }
    createReviewAdapt(data: CreateReviewRES): IReview {
        return {
            id: data.payload.review.id,
            content: data.payload.review.content,
            userId: data.payload.review.userId,
            productId: data.payload.review.productId,
            createdAt: data.payload.review.createdAt,
            headline: data.payload.review.headline,
            product: data.payload.review.product,
            rating: data.payload.review.rating,
            updatedAt: data.payload.review.updatedAt,
            user: data.payload.review.user
        }
    }
}
