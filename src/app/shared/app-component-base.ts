import { inject, signal } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ToastService } from "./services/toast.service";


export abstract class AppComponentBase {

  _toastService = inject(ToastService)
  _cookieService = inject(CookieService);

  currentUser = signal( this._cookieService.get('user') ? JSON.parse(this._cookieService.get('user')) : null )
  formSubmited = signal<boolean>(false);
  errorsMsg = signal<any>('');
}
