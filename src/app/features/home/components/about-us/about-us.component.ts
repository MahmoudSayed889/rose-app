import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, icons } from 'lucide-angular';

interface AboutUsChecklistItem {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-about-us',
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  readonly icons = icons;

  readonly leftChecklist: AboutUsChecklistItem[] = [
    { id: 'competitive-prices', labelKey: 'home.aboutUs.checklist.competitivePrices' },
    { id: 'every-occasion',     labelKey: 'home.aboutUs.checklist.everyOccasion' },
  ];

  readonly rightChecklist: AboutUsChecklistItem[] = [
    { id: 'premium-quality', labelKey: 'home.aboutUs.checklist.premiumQuality' },
    { id: 'fast-delivery',   labelKey: 'home.aboutUs.checklist.fastDelivery' },
  ];
}
