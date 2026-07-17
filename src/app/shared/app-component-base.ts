import { computed, inject, signal } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ToastService } from "./services/toast.service";
import { LanguageSwitcherService } from "reusable-components";


export abstract class AppComponentBase {

  private readonly _languageSwitcherService = inject(LanguageSwitcherService);
  _toastService = inject(ToastService);
  _cookieService = inject(CookieService);

  currentUser = signal( this._cookieService.get('user') ? JSON.parse(this._cookieService.get('user')) : null )
  formSubmited = signal<boolean>(false);
  errorsMsg = signal<any>('');

  paginator = signal({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  readonly isDirRtl = computed(() => this._languageSwitcherService.selectedLanguage()?.code === 'en')
}
