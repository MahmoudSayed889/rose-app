import { DecimalPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, effect, HostListener, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponentBase } from '../../app-component-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../features/products/services/products.service';
import { Product } from '../../../features/products/models/product';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';
import { HighlightPipe } from '../../pipes/highlight.pipe';


@Component({
  selector: 'app-search-dialog',
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    DecimalPipe,
    TranslatePipe,
    HighlightPipe
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
})
export class SearchDialogComponent extends AppComponentBase implements OnInit {

  private readonly productService = inject(ProductsService);
  private readonly DestroyRef = inject(DestroyRef);

  searchVal = model<string>('')
  visibleSearchDialog = model<boolean>();

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  productsYouMayLike = signal<Product[]>([]);

  constructor() {
    super();

    effect(() => {
      if (this.searchVal()) {
        this.search()
      } else {
        this.filteredProducts.set(this.productsYouMayLike())
      }
    });
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts()
      .pipe(takeUntilDestroyed(this.DestroyRef))
      .subscribe({
        next: (res) => {
          this.products.set(res.payload.data)
          this.filteredProducts.set(res.payload.data)
          this.productsYouMayLike.set(res.payload.data.filter(item => item.tags?.includes('hot')))
        }
      })
  }

  search() {
    this.filteredProducts.set(this.products().filter(p => p.title.toLocaleLowerCase().includes(this.searchVal() as string)))
  }
}
