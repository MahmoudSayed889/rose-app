import { Component } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';

interface AboutUsChecklistItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-about-us',
  imports: [LucideAngularModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  readonly icons = icons;

  readonly leftChecklist: AboutUsChecklistItem[] = [
    { id: 'competitive-prices', label: 'Competitive Prices & Easy Shopping' },
    { id: 'every-occasion', label: 'Perfect for Every Occasion' },
  ];

  readonly rightChecklist: AboutUsChecklistItem[] = [
    { id: 'premium-quality', label: 'Premium Quality & Elegant Packaging' },
    { id: 'fast-delivery', label: 'Fast & Reliable Delivery' },
  ];
}
