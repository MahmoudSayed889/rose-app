import { Component, input, output, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Pagination } from './models/pagination';

@Component({
  selector: 'lib-paginator',
  imports: [
    PaginatorModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {

  pagination = input.required<Pagination>();

  pageChange = output<PaginatorState>();
}
