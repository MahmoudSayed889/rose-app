import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GiftImageComponent } from '../gift-image/gift-image.component';
import { GiftsCarouselComponent } from '../gifts-carousel/gifts-carousel.component';
import { GiftItem } from '../gifts-carousel/gift-item.interface';

@Component({
  selector: 'app-special-gifts-section',
  imports: [GiftsCarouselComponent, GiftImageComponent, TranslatePipe],
  templateUrl: './special-gifts-section.component.html',
  styleUrl: './special-gifts-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialGiftsSectionComponent {
  readonly carouselGifts = signal<GiftItem[]>([
    {
      id: 1,
      imageUrl: '/temp-images/gift1.jpg',
      badge: 'specialGifts.carousel.slide1.badge',
      title: 'specialGifts.carousel.slide1.title',
      overlayText: 'specialGifts.carousel.slide1.overlayText',
      buttonLabel: 'specialGifts.imBuying',
    },
    {
      id: 2,
      imageUrl: '/temp-images/gift2.jpg',
      overlayText: 'specialGifts.carousel.slide2.overlayText',
      buttonLabel: 'specialGifts.imBuying',
    },
    {
      id: 3,
      imageUrl: '/temp-images/gift3.jpg',
      // badge: 'specialGifts.carousel.slide3.badge',
      overlayText: 'specialGifts.carousel.slide3.overlayText',
      buttonLabel: 'specialGifts.imBuying',
    },
    {
      id: 4,
      imageUrl: '/temp-images/gift4.jpg',
      overlayText: 'specialGifts.carousel.slide4.overlayText',
      buttonLabel: 'specialGifts.imBuying',
    },
  ]);

  readonly rowTwoImages = signal<GiftItem[]>([
    {
      id: 4,
      imageUrl: '/temp-images/gift2.jpg',
      badge: 'specialGifts.row2.wedding.badge',
      overlayText: 'specialGifts.row2.wedding.overlayText',
    },
    {
      id: 5,
      imageUrl: '/temp-images/gift3.jpg',
      badge: 'specialGifts.row2.engagement.badge',
      overlayText: 'specialGifts.row2.engagement.overlayText',
    },
    {
      id: 6,
      imageUrl: '/temp-images/gift4.jpg',
      badge: 'specialGifts.row2.anniversary.badge',
      overlayText: 'specialGifts.row2.anniversary.overlayText',
    },
  ]);

  onGiftAction(id: string | number): void {
    console.log('Gift action triggered for id:', id);
  }
}
