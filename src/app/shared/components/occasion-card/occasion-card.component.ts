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
import { Occasion } from './occasion.interface';

@Component({
  selector: 'app-occasion-card',
  imports: [],
  templateUrl: './occasion-card.component.html',
  styleUrl: './occasion-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccasionCardComponent {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  occasion = input.required<Occasion>();
  selected = input<boolean>(false);

  occasionSelect = output<string>();

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
