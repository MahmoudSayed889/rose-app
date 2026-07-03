import { Component, input, signal } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

export interface GalleryImage {
  itemImageSrc: string;
  alt: string;
}

@Component({
  selector: 'app-galleria',
  imports: [GalleriaModule],
  templateUrl: './galleria.component.html',
  styleUrl: './galleria.component.scss',
})
export class GalleriaComponent {
  images = input.required<GalleryImage[]>();
}
