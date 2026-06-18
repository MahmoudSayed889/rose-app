import { Component, inject, OnInit, signal } from '@angular/core';
import { ThemeSwitcherService } from './services/theme-switcher.service';

@Component({
  selector: 'lib-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit { 

  private readonly _themeSwitcherService = inject(ThemeSwitcherService)

  currentTheme = this._themeSwitcherService.currentTheme

  ngOnInit(): void {
    this._themeSwitcherService.initTheme()
  }

  toggleTheme() {
    this._themeSwitcherService.toggleTheme()
  }
}
