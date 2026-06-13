import { inject, signal } from "@angular/core";
import { MessageService } from "primeng/api";


export abstract class AppComponentBase {

  private _messageService = inject(MessageService);

  currentUser = JSON.parse(localStorage.getItem('user')!)?.user
  formSubmited = signal<boolean>(false);
  errorsMsg = signal<any>('');

  toaster(
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast',
    title?: string
  ) {
    this._messageService.add({
      severity: severity,
      detail: title
    });
  }
}
