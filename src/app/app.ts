import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [MessageService]
})
export class App {
  protected readonly title = signal('rose-app');

  private readonly _translateService = inject(TranslateService)

  constructor() {
    this._translateService.addLangs(['ar', 'en']);
    this._translateService.setFallbackLang(localStorage.getItem('lang') || 'en');
    this._translateService.use(localStorage.getItem('lang') || 'en');

    const root = document.documentElement
    root.setAttribute('lang', this._translateService.getCurrentLang()!)
    root.setAttribute('dir', this._translateService.getCurrentLang() == 'ar' ? 'rtl' : 'ltr')
  }
}
