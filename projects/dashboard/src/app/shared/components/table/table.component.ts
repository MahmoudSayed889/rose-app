import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Column } from './models/column';


@Component({
  selector: 'app-table',
  imports: [
    TableModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  // private productService = inject(ProductService);
  // products!: Product[];
  cols!: Column[];

  products = []

  ngOnInit() {
    
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];
  }
}
