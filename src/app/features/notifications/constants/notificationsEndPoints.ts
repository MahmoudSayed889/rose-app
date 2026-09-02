import { inject, Injectable } from '@angular/core';
import { AUTH_API_URL } from 'auth-library';

@Injectable({
  providedIn: 'root',
})
export class NotificationsEndPoints {
  private readonly _baseURL = inject(AUTH_API_URL);

  readonly GetAllNotifications = `${this._baseURL}/api/notifications`;
  readonly UnreadNotificationsCount = `${this._baseURL}/api/notifications/unread-count`;
  readonly MarkNotificationAsRead = (id: string) => `${this._baseURL}/api/notifications/${id}`;
  readonly MarkAllAsRead = `${this._baseURL}/api/notifications/mark-all-read`;
  readonly DeleteNotification = (id: string) => `${this._baseURL}/api/notifications/${id}`;
  readonly DeleteAllNotifications = `${this._baseURL}/api/notifications/clear-all`;
}
