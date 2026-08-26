import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { uploadImageRES } from '../models/image-model';

@Service()
export class ImageService {
  private readonly httpClient = inject(HttpClient);
  private readonly _baseURL = inject(AUTH_API_URL);

  uploadImage(file: File): Observable<uploadImageRES> {
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post<uploadImageRES>(`${this._baseURL}/api/upload`, formData);
  }
}
