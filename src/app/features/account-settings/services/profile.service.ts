import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AccountSettingsEndPoints } from '../constants/AccountSettingsEndPoints';
import { Observable } from 'rxjs';
import { getUserProfileRES } from '../models/profile-interface';

@Service()
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly endpoints = inject(AccountSettingsEndPoints);

  getUserProfile(): Observable<getUserProfileRES> {
    return this.httpClient.get<getUserProfileRES>(this.endpoints.GetUserProfile);
  }

  // deleteAccount(): Observable<any> {
  //   return this.httpClient.delete()
  // }
}
