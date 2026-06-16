import { inject, Service, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Service()
export class ThemeSwitcherService {

    private readonly _cookieService = inject(CookieService);

    currentTheme = signal<'light' | 'dark'>('light')

    initTheme() {
        this.currentTheme.set(this._cookieService.get('theme') as 'light' | 'dark' || 'light')
        document.documentElement.setAttribute('class', this.currentTheme());
    }

    toggleTheme() {
        this.currentTheme.set(this._cookieService.get('theme') as 'light' | 'dark' || 'light')
        const nextTheme = signal<'light' | 'dark'>(this.currentTheme() === 'light' ? 'dark' : 'light')

        this._cookieService.set('theme', nextTheme(), 90, '/')
        document.documentElement.setAttribute('class', nextTheme());

        this.currentTheme.set(nextTheme())
    }
}
