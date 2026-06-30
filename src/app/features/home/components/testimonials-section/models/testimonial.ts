import { MainResponse } from "../../../../../shared/models/main-response"
import { Metadata } from "../../../../../shared/models/metadata"

export type TestimonialsList = MainResponse<TestimonialsListPayload>

export interface TestimonialsListPayload {
    data: Testimonial[]
    metadata: Metadata
}

export type SingleTestimonial = MainResponse<SingleTestimonialPayload>

export interface SingleTestimonialPayload {
    testimonial: Testimonial
}

export interface Testimonial {
    id: string
    name: string
    email: string
    content: string
    rating: number
    image?: string
    isApproved: boolean
    immutable: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateTestimonialRequest {
    name: string
    email: string
    content: string
    rating: number
    image: string
}

export interface DeleteTestimonialResponse {
    status: boolean
    code: number
    message: string
    payload: string
}