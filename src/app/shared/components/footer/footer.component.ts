import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

interface FooterLink {
  label: string;
  url: string;
}


@Component({
  selector: 'app-footer',
  imports: [RouterLink, InputGroupModule, InputTextModule, ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  links: FooterLink[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Categories', url: '/categories' },
    { label: 'Occasions', url: '/occasions' },
    { label: 'Contact', url: '/contact' },
    { label: 'About', url: '/about' },
    { label: 'Terms & Conditions', url: '/terms' },
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'FAQs', url: '/faq' },
  ];
}
