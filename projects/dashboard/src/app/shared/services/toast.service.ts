import { inject, Service } from '@angular/core';
import { MessageService } from 'primeng/api';

@Service()
export class ToastService {

    private _messageService = inject(MessageService);

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
