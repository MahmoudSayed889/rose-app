import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trusted-by',
  imports: [TranslatePipe],
  templateUrl: './trusted-by.component.html',
  styleUrl: './trusted-by.component.scss',
})
export class TrustedByComponent {
  readonly companyLogos = [
    'assets/imgs/image36.svg',
    'assets/imgs/image40.svg',
    'assets/imgs/image41.svg',
    'assets/imgs/image38.svg',
    'assets/imgs/image39.svg',
    'assets/imgs/image37.svg',
  ];
}
