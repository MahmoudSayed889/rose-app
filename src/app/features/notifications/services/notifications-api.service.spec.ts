import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { NotificationsApiService } from './notifications-api.service';
import { NotificationsEndPoints } from '../constants/notificationsEndPoints';
import { AUTH_API_URL } from 'auth-library';

import {
  GetAllNotificationsRES,
  Notification,
  NotificationActionResponse,
  ReadNotificationREQ,
  ReadNotificationRES,
  UnreadNotificationsCountRES,
} from '../models/notifications.interface';

describe('NotificationsApiService', () => {
  let service: NotificationsApiService;
  let httpTestingController: HttpTestingController;

  const baseUrl = 'https://test-api.example.com';

  const notification: Notification = {
    id: 'notification-123',
    userId: 'user-123',
    type: 'ORDER',
    title: 'Order Update',
    message: 'Your order has been shipped.',
    isRead: false,
    link: '/orders/123',
    createdAt: new Date('2026-08-01T10:00:00Z'),
    updatedAt: new Date('2026-08-01T10:00:00Z'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationsApiService,
        NotificationsEndPoints,
        {
          provide: AUTH_API_URL,
          useValue: baseUrl,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(NotificationsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllNotifications', () => {
    it('should send a GET request to get all notifications', () => {
      const mockResponse: GetAllNotificationsRES = {
        status: true,
        code: 200,
        message: 'Notifications retrieved successfully',
        payload: {
          data: [notification],
          metadata: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
          },
        },
      };

      service.getAllNotifications().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${baseUrl}/api/notifications`);

      expect(request.request.method).toBe('GET');

      request.flush(mockResponse);
    });
  });

  describe('getUnreadNotificationsCount', () => {
    it('should send a GET request to get the unread notifications count', () => {
      const mockResponse: UnreadNotificationsCountRES = {
        status: true,
        code: 200,
        payload: {
          unreadCount: 5,
        },
      };

      service.getUnreadNotificationsCount().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${baseUrl}/api/notifications/unread-count`);

      expect(request.request.method).toBe('GET');

      request.flush(mockResponse);
    });
  });

  describe('MarkNotificationAsRead', () => {
    it('should send a PATCH request with the notification id and request body', () => {
      const notificationId = 'notification-123';

      const data: ReadNotificationREQ = {
        isRead: true,
      };

      const mockResponse: ReadNotificationRES = {
        status: true,
        code: 200,
        payload: {
          notification: {
            ...notification,
            isRead: true,
          },
        },
      };

      service.MarkNotificationAsRead(notificationId, data).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(
        `${baseUrl}/api/notifications/${notificationId}`,
      );

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(data);

      request.flush(mockResponse);
    });
  });

  describe('MarkAllAsRead', () => {
    it('should send a PATCH request with an empty body', () => {
      const mockResponse: NotificationActionResponse = {
        status: true,
        code: 200,
        message: 'All notifications marked as read',
      };

      service.MarkAllAsRead().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${baseUrl}/api/notifications/mark-all-read`);

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual({});

      request.flush(mockResponse);
    });
  });

  describe('DeleteNotification', () => {
    it('should send a DELETE request with the notification id', () => {
      const notificationId = 'notification-123';

      const mockResponse: NotificationActionResponse = {
        status: true,
        code: 200,
        message: 'Notification deleted successfully',
      };

      service.DeleteNotification(notificationId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(
        `${baseUrl}/api/notifications/${notificationId}`,
      );

      expect(request.request.method).toBe('DELETE');

      request.flush(mockResponse);
    });
  });

  describe('DeleteAllNotifications', () => {
    it('should send a DELETE request to clear all notifications', () => {
      const mockResponse: NotificationActionResponse = {
        status: true,
        code: 200,
        message: 'All notifications deleted successfully',
      };

      service.DeleteAllNotifications().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${baseUrl}/api/notifications/clear-all`);

      expect(request.request.method).toBe('DELETE');

      request.flush(mockResponse);
    });
  });
});
