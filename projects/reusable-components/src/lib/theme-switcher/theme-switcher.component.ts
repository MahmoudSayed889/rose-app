import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'lib-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit { 

  currentTheme = signal<'light' | 'dark'>('light')

  ngOnInit(): void {
    this.currentTheme.set(localStorage.getItem('theme') as 'light' | 'dark')
    document.documentElement.setAttribute('class', this.currentTheme());
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light'
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', nextTheme);

    document.documentElement.setAttribute('class', nextTheme);

    this.currentTheme.set(nextTheme)
  }
}
