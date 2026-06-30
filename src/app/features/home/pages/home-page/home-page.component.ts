import { Component } from '@angular/core';
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GallerySectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
