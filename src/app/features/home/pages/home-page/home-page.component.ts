import { Component } from '@angular/core';
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GallerySectionComponent,
    TestimonialsSectionComponent,
    AboutUsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
