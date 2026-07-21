import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TitleComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-gallery-section',
  imports: [
    NgClass,
    TitleComponent
  ],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
})
export class GallerySectionComponent extends AppComponentBase {

  galleryItems = signal([
    {
      img: 'assets/imgs/gallery/g-1.png',
      class: 'row-span-8',
    },
    {
      img: 'assets/imgs/gallery/g-6.png',
      class: 'row-span-4',
    },
    {
      img: 'assets/imgs/gallery/g-5.png',
      class: 'row-span-4',
    },
    {
      img: 'assets/imgs/gallery/g-3.png',
      class: 'row-span-4 lg:row-span-8',
    },
    {
      img: 'assets/imgs/gallery/g-4.png',
      class: 'row-span-20 lg:row-span-8',
    },
    {
      img: 'assets/imgs/gallery/g-2.png',
      class: 'row-span-16 lg:row-span-4',
    },
  ])
}
