import { Component } from '@angular/core';
import { IconLabelComponent } from '../../../../../shared/components/icon-label/icon-label.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-service-section',
  imports: [IconLabelComponent, LucideAngularModule],
  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss',
})
export class ServiceSectionComponent {}
