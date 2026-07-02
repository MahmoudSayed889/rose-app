import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  icons,
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
} from 'lucide-angular';

@Component({
  selector: 'app-icon-label',
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(icons),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-label.component.html',
  styleUrl: './icon-label.component.scss',
})
export class IconLabelComponent {
  icon = input.required<string>();
  iconType = input<'prime' | 'lucide'>('prime');
  title = input.required<string>();
  subTitle = input.required<string>();
}
