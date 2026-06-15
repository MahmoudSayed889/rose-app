import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from 'reusable-components';
import { ThemeSwitcherComponent } from 'reusable-components';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet,
    LanguageSwitcherComponent,
    ThemeSwitcherComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
