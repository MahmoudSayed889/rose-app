import { Service } from '@angular/core';

@Service()
export class StarsService {
    getStarsInfo(rating: number | undefined | null) {
        const clampedRating = Math.max(0, Math.min(5, Number(rating) || 0));
        const fullStarsCount = Math.floor(clampedRating);
        const hasHalfStar = (clampedRating - fullStarsCount) > 0;
        const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

        return {
            fullStarsArray: Array.from({ length: fullStarsCount }, (_, i) => i),
            hasHalfStar,
            emptyStarsArray: Array.from({ length: emptyStarsCount }, (_, i) => i)
        }
    }
}
