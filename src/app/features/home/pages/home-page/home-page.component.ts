import { Component } from '@angular/core';
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GallerySectionComponent,
    TestimonialsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
