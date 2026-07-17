import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sp-line',
  imports: [],
  templateUrl: './sp-line.component.html',
  styleUrl: './sp-line.component.scss',
})
export class SpLineComponent {
  lightColor = input<string>('border-gray-200');
  darkColor = input<string>('border-zinc-900');
}
