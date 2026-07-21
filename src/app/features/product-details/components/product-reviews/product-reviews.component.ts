import { Component, computed, DestroyRef, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { TitleComponent, InputComponent, ButtonComponent } from "reusable-components";
import { Product } from '../../../products/models/product';
import { ReviewCardComponent } from "../review-card/review-card.component";
import { ReviewsService } from '../../services/reviews.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IReview } from '../../models/review.interface';
import { StarsService } from '../../../../shared/services/stars.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-reviews',
  imports: [SpLineComponent, TitleComponent, ReviewCardComponent, InputComponent, ReactiveFormsModule, ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent implements OnInit {
  private readonly _reviewService = inject(ReviewsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _starsService = inject(StarsService);
  private readonly _fb = inject(FormBuilder);

  productDetails = input.required<Product>();
  productReviews: WritableSignal<IReview[]> = signal([]);
  createReviewLoading: WritableSignal<boolean> = signal(false);


  // starsInfo = computed(() => {
  //   const rawRating = this.productDetails()?.rating;
  //   let fullStarsCount = 0;
  //   let hasHalfStar = false;
  //   let emptyStarsCount = 0;

  //   if (rawRating !== undefined && rawRating !== null && !isNaN(Number(rawRating))) {
  //     const intRating = Math.max(0, Math.min(5, Number(rawRating)));
  //     fullStarsCount = Math.floor(intRating);
  //     hasHalfStar = (intRating - fullStarsCount) > 0;
  //     if (hasHalfStar)
  //       emptyStarsCount = 5 - fullStarsCount - 1;
  //     else
  //       emptyStarsCount = 5 - fullStarsCount - 1;
  //   }
  //   return {
  //     fullStarsArray: Array(fullStarsCount).fill(0),
  //     hasHalfStar,
  //     emptyStarsArray: Array(emptyStarsCount).fill(0)
  //   }
  // })

  starsInfo = computed(() => {
    const rating = this.productDetails()?.rating;
    return this._starsService.getStarsInfo(rating);
  });

  getProductReviews(productId: string): void {
    this._reviewService.getProductReviews(productId)
      .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          this.productReviews.set(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  createReview(): void {
    this.createReviewLoading.set(true);

    const review = {
      productId: this.productDetails().id,
      headline: this.createReviewForm.get('headline')?.value ?? '',
      content: this.createReviewForm.get('content')?.value ?? '',
      rating: this.createReviewForm.get('rating')?.value ?? 1
    }

    this._reviewService.createReview(review)
      .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          this.createReviewLoading.set(false);
          this.createReviewForm.reset();
          this.getProductReviews(this.productDetails().id);
        },
        error: (err) => {
          console.log(err);
          this.createReviewLoading.set(false);
        }
      })
  }

  rating = signal<number>(0);
  hoverRating = signal<number>(0);
  setRating(val: number) {
    this.rating.set(val);
  }
  setHover(val: number) {
    this.hoverRating.set(val);
  }


  createReviewForm = this._fb.group({
    headline: ['', [Validators.required]],
    content: [''],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  onStarClick(val: number): void {
    this.setRating(val);
    this.createReviewForm.get('rating')?.setValue(this.rating());
  }
  submit() {
    if (this.createReviewForm.valid) {
      console.log(this.createReviewForm.value);
      this.createReview();
    }
  }

  ngOnInit(): void {
    this.getProductReviews(this.productDetails().id)
  }
}
