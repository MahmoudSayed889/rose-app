export interface BReview {
    status: boolean;
    code: number;
    payload: GetReviewPayload;
}

interface GetReviewPayload {
    data: Datum[];
    metadata: Metadata;
}

interface Datum {
    id: string;
    userId: string;
    productId: string;
    headline: string;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product;
}

interface Product {
    id: string;
    title: string;
}

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

interface Metadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IReview {
    id: string;
    userId: string;
    productId: string;
    headline: string;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product;
}

export interface CreateReviewREQ {
    productId: string;
    headline: string;
    content: string;
    rating: number;
}

export interface CreateReviewRES {
    status: boolean;
    code: number;
    payload: CreateReviewPayload;
}

export interface CreateReviewPayload {
    review: IReview;
}

