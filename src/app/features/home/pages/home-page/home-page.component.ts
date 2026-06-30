import { Component } from '@angular/core';
import { AboutUsComponent } from "../../components/about-us/about-us.component";

@Component({
  selector: 'app-home-page',
  imports: [AboutUsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
