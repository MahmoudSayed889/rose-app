import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

interface langConfig {
  name: string,
  code: string
}

@Component({
  selector: 'lib-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {

  private readonly _translateService = inject(TranslateService);
  
  languages = signal<langConfig[]>([])
  selectedLanguage = signal<langConfig | null>(null)

  ngOnInit(): void {
    this.languages.set([
      {
        name: 'العربية',
        code: 'ar',
      },
      {
        name: 'English',
        code: 'en',
      }
    ]);

    this.selectedLanguage.update(val => this._translateService.getCurrentLang() === 'en' ? val = this.languages()[0] : val = this.languages()[1])
  }

  toggleLanguage() {
    const currentLang = this._translateService.getCurrentLang();
    const nextLang = currentLang === 'en' ? 'ar' : 'en';

    this._translateService.use(nextLang);

    localStorage.setItem('lang', nextLang);

    document.documentElement.setAttribute('lang', nextLang);
    document.documentElement.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');

    this.selectedLanguage.set(nextLang === 'en' ? this.languages()[0] : this.languages()[1]);
  }
}
