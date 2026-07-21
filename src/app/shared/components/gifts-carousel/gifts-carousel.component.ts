import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Carousel, CarouselModule, CarouselPageEvent } from 'primeng/carousel';
import { TranslatePipe } from '@ngx-translate/core';
import { GiftImageComponent } from '../gift-image/gift-image.component';
import { GiftItem } from './gift-item.interface';

@Component({
  selector: 'app-gifts-carousel',
  imports: [CarouselModule, GiftImageComponent, TranslatePipe],
  templateUrl: './gifts-carousel.component.html',
  styleUrl: './gifts-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftsCarouselComponent {
  @ViewChild('carousel') carousel!: Carousel;

  private readonly document = inject(DOCUMENT);

  gifts = input.required<GiftItem[]>();

  giftAction = output<string | number>();

  activeIndex = signal<number>(0);

  isRtl = computed(
    () =>
      this.document.documentElement.dir === 'rtl' ||
      this.document.documentElement.lang === 'ar',
  );

  onPageChange(event: CarouselPageEvent): void {
    this.activeIndex.set(event.page ?? 0);
  }

  next(): void {
    this.carousel.navForward(new MouseEvent('click'));
  }

  prev(): void {
    this.carousel.navBackward(new MouseEvent('click'));
  }

  goToSlide(index: number): void {
    const diff = index - this.activeIndex();
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.carousel.navForward(new MouseEvent('click'));
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        this.carousel.navBackward(new MouseEvent('click'));
      }
    }
  }
}
