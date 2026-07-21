import { Component } from '@angular/core';
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { ServiceSectionComponent } from '../../components/Service Highlights-section/service-section/service-section.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { TrustedByComponent } from '../../components/trusted-by-section/trusted-by/trusted-by.component';
import { BestSellingComponent } from "../../components/best-selling/best-selling.component";
import { SpecialGiftsSectionComponent } from '../../../../shared/components/special-gifts-section/special-gifts-section.component';
import { MostPopularComponent } from '../../components/most-popular/most-popular.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GallerySectionComponent,
    TestimonialsSectionComponent,
    ServiceSectionComponent,
    AboutUsComponent,
    TrustedByComponent,
    BestSellingComponent,
    SpecialGiftsSectionComponent,
    MostPopularComponent,
    MostPopularComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
