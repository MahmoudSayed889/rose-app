import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsEndPoints } from '../constants/notificationsEndPoints';
import {
  GetAllNotificationsRES,
  NotificationActionResponse,
  ReadNotificationREQ,
  ReadNotificationRES,
  UnreadNotificationsCountRES,
} from '../models/notifications.interface';

@Service()
export class NotificationsApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly notificationsEndPoints = inject(NotificationsEndPoints);

  getAllNotifications(): Observable<GetAllNotificationsRES> {
    return this.httpClient.get<GetAllNotificationsRES>(
      this.notificationsEndPoints.GetAllNotifications,
    );
  }

  getUnreadNotificationsCount(): Observable<UnreadNotificationsCountRES> {
    return this.httpClient.get<UnreadNotificationsCountRES>(
      this.notificationsEndPoints.UnreadNotificationsCount,
    );
  }

  MarkNotificationAsRead(id: string, data: ReadNotificationREQ): Observable<ReadNotificationRES> {
    return this.httpClient.patch<ReadNotificationRES>(
      this.notificationsEndPoints.MarkNotificationAsRead(id),
      data,
    );
  }

  MarkAllAsRead(): Observable<NotificationActionResponse> {
    return this.httpClient.patch<NotificationActionResponse>(
      this.notificationsEndPoints.MarkAllAsRead,
      {},
    );
  }

  DeleteNotification(id: string): Observable<NotificationActionResponse> {
    return this.httpClient.delete<NotificationActionResponse>(
      this.notificationsEndPoints.DeleteNotification(id),
    );
  }

  DeleteAllNotifications(): Observable<NotificationActionResponse> {
    return this.httpClient.delete<NotificationActionResponse>(
      this.notificationsEndPoints.DeleteAllNotifications,
    );
  }
}
