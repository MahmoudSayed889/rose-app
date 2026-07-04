import { Component, inject, OnInit, signal } from '@angular/core';
import { TestimonialsService } from './services/testimonials.service';
import { ExternalParams } from '../../../../shared/models/external-params';
import { Testimonial, TestimonialsList } from './models/testimonial';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TitleComponent } from 'reusable-components';

@Component({
  selector: 'app-testimonials-section',
  imports: [
    RatingModule,
    FormsModule,
    DatePipe,
    TitleComponent
  ],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
})
export class TestimonialsSectionComponent implements OnInit {

  private _testimonialsService = inject(TestimonialsService)

  testimonials = signal<Testimonial[]>([])

  ngOnInit(): void {
    this.getTestimonials()
  }


  getTestimonials() {
    const params = {
      page: 1,
      limit: 3
    } as ExternalParams

    this._testimonialsService.getTestimonials(params).subscribe({
      next: (res: TestimonialsList) => {
        this.testimonials.set(res.payload.data)        
      }
    })
  }
}
