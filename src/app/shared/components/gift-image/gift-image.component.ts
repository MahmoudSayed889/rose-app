import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-gift-image',
  imports: [],
  templateUrl: './gift-image.component.html',
  styleUrl: './gift-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftImageComponent {
  imageUrl = input.required<string>();
  badge = input<string>('');
  title = input<string>('');
  overlayText = input<string>('');
  buttonLabel = input<string>('');
  overlayType = input<'dark-solid' | 'gradient-bottom' | 'gradient-left'>('dark-solid');

  buttonClick = output<void>();

  readonly overlayBackground = computed(() => {
    switch (this.overlayType()) {
      case 'gradient-bottom':
        return 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)';
      case 'gradient-left':
        return 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 100%)';
      case 'dark-solid':
      default:
        return 'rgba(0,0,0,0.10)';
    }
  });

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
