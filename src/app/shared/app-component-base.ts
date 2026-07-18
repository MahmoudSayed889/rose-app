import { computed, inject, signal } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ToastService } from "./services/toast.service";
import { LanguageSwitcherService } from "reusable-components";
import { AuthService } from "auth-library";


export abstract class AppComponentBase {

  private readonly _languageSwitcherService = inject(LanguageSwitcherService);
  protected readonly _authService = inject(AuthService)
  protected readonly _toastService = inject(ToastService);
  protected readonly _cookieService = inject(CookieService);

  isAuthenticated = this._authService.isAuthenticated
  currentUser = signal(this._cookieService.get('user') ? JSON.parse(this._cookieService.get('user')) : null)
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
