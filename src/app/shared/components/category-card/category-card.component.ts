import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
} from '@angular/core';
import { Category } from './category.interface';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  category = input.required<Category>();
  selected = input<boolean>(false);

  categorySelect = output<string>();

  constructor() {
    effect(() => {
      if (this.selected()) {
        this.renderer.addClass(this.el.nativeElement, 'selected');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'selected');
      }
    });
  }
}
