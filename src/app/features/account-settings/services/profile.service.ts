import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AccountSettingsEndPoints } from '../constants/AccountSettingsEndPoints';
import { Observable } from 'rxjs';
import {
  ConfirmEmailChangeREQ,
  ConfirmEmailChangeRES,
  DeleteAccountRES,
  getUserProfileRES,
  RequestEmailChangeREQ,
  RequestEmailChangeRES,
  UpdateProfileREQ,
  UpdateProfileRES,
} from '../models/profile-interface';

@Service()
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly endpoints = inject(AccountSettingsEndPoints);

  getUserProfile(): Observable<getUserProfileRES> {
    return this.httpClient.get<getUserProfileRES>(this.endpoints.GetUserProfile);
  }

  updateProfile(data: UpdateProfileREQ): Observable<UpdateProfileRES> {
    return this.httpClient.patch<UpdateProfileRES>(this.endpoints.UpdateProfile, data);
  }

  requestEmailChange(data: RequestEmailChangeREQ): Observable<RequestEmailChangeRES> {
    return this.httpClient.post<RequestEmailChangeRES>(this.endpoints.RequestEmailChange, data);
  }

  ConfirmEmailChange(data: ConfirmEmailChangeREQ): Observable<ConfirmEmailChangeRES> {
    return this.httpClient.post<ConfirmEmailChangeRES>(this.endpoints.ConfirmEmailChange, data);
  }

  deleteAccount(): Observable<DeleteAccountRES> {
    return this.httpClient.delete<DeleteAccountRES>(this.endpoints.DeleteAccount);
  }
}
