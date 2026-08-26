import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AccountSettingsEndPoints } from '../constants/AccountSettingsEndPoints';
import { Observable } from 'rxjs';

@Service()
export class ChangePasswordService {

    private readonly httpClient = inject(HttpClient);
    private readonly endpoints = inject(AccountSettingsEndPoints);

    changePassword(data: ChangePasswordReq): Observable<ChangePasswordRes> {
        return this.httpClient.post<ChangePasswordRes>(this.endpoints.ChangePassword, data);
    }
}
