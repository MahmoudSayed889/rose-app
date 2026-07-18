import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { SingleUser } from '../models/user';

@Service()
export class UserService {

    private _httpClient = inject(HttpClient)
    private baseUrl = inject(AUTH_API_URL)

    getUser(): Observable<SingleUser> {
        return this._httpClient.get<SingleUser>(`${this.baseUrl}/api/users/profile`)
    }
}
