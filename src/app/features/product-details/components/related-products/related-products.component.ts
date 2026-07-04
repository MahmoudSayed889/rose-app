import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductCardComponent, TitleComponent } from 'reusable-components';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-related-products',
  imports: [TitleComponent, ProductCardComponent, TranslatePipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnInit {
  private _productsService = inject(ProductsService);

  products: WritableSignal<Product[]> = signal([]);

  ngOnInit(): void {
    this._productsService.getProducts({ page: 1, limit: 4 }).subscribe({
      next: (res) => {
        this.products.set(res.payload.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
