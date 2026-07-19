import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { HelperService } from '../../../shared/services/helper.service';
import { CreateProductRequest, DeleteProductResponse, Product, ProductsList, SingleProduct } from '../models/product';
import { ExternalParams } from '../../../shared/models/external-params';
import { ProductCardBadge } from 'reusable-components';

@Service()
export class ProductsService {

    private _httpClient = inject(HttpClient)
    private baseUrl = inject(AUTH_API_URL)
    private _helperService = inject(HelperService)

    getProducts(params?: ExternalParams): Observable<ProductsList> {
        return this._httpClient.get<ProductsList>(`${this.baseUrl}/api/products`, { params: this._helperService.createParams(params) })
            .pipe(
                map(res => {
                    res.payload.data = res.payload.data.map(product => {
                        return {
                            ...product,
                            tags: this.getProductsTags(product)
                        }
                    })
                    return res
                }
                )
            )
    }

    getProduct(id: string): Observable<SingleProduct> {
        return this._httpClient.get<SingleProduct>(`${this.baseUrl}/api/products/${id}`)
    }

    getBestSellingProducts(params?: ExternalParams): Observable<Product[]> {
        return this.getProducts(params).pipe(
            map(response => ([...response.payload.data]
                .sort((a, b) => b._count.cartItems - a._count.cartItems)
            ))
        );
    }

    getProductsTags(product: Product): ProductCardBadge[] {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        const tags: ProductCardBadge[] = [];

        if (product.rating >= 4) {
            tags.push('hot');
        }
        if (product.stock === 0) {
            tags.push('out-of-stock');
        }
        const productDate = new Date(product.createdAt);
        if (productDate >= sixMonthsAgo && productDate <= today) {
            tags.push('new');
        }
        return tags;
    }

    getPrice(product: Product): void {
        if (product.discountType === "PERCENT") {
            const discountValue = (Number(product.price) * Number(product.discountValue)) / 100;
            product.priceWithDiscount = Number(product.price) - Number(discountValue);
        }
        else if (product.discountType == 'VALUE') {
            product.priceWithDiscount = Number(product.price) - Number(product.discountValue);
        }
        else {
            product.priceWithDiscount = Number(product.price);
        }
    }
}
