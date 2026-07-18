import { inject, Service } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Service()
export class SpinnerService {
    private readonly spinner = inject(NgxSpinnerService);

    private requests = 0;

    show() {
        if (this.requests === 0) {
            this.spinner.show();
        }

        this.requests++;
    }

    hide() {
        this.requests--;

        if (this.requests <= 0) {
            this.requests = 0;
            this.spinner.hide();
        }
    }
}