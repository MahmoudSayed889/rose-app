import { Component, computed, inject, input } from '@angular/core';
import { IReview } from '../../models/review.interface';
import { StarsService } from '../../../../shared/services/stars.service';
import { DatePipe } from '@angular/common';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";

@Component({
  selector: 'app-review-card',
  imports: [DatePipe, SpLineComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  private readonly _starsService = inject(StarsService);
  review = input.required<IReview>();

  starsInfo = computed(() => {
    const rating = this.review()?.rating;
    return this._starsService.getStarsInfo(rating);
  });

  

}
