import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';

import { NotificationsFacadeService } from './notifications-facade.service';
import { NotificationsApiService } from './notifications-api.service';
import {
  GetAllNotificationsRES,
  Notification,
  NotificationActionResponse,
  ReadNotificationRES,
  UnreadNotificationsCountRES,
} from '../models/notifications.interface';

describe('NotificationsFacadeService', () => {
  let service: NotificationsFacadeService;
  let notificationsApiService: {
    getAllNotifications: ReturnType<typeof vi.fn>;
    getUnreadNotificationsCount: ReturnType<typeof vi.fn>;
    MarkNotificationAsRead: ReturnType<typeof vi.fn>;
    MarkAllAsRead: ReturnType<typeof vi.fn>;
    DeleteNotification: ReturnType<typeof vi.fn>;
    DeleteAllNotifications: ReturnType<typeof vi.fn>;
  };

  const notification1: Notification = {
    id: 'notification-1',
    userId: 'user-1',
    type: 'ORDER',
    title: 'Order Shipped',
    message: 'Your order has been shipped.',
    isRead: false,
    link: '/orders/1',
    createdAt: new Date('2026-08-01T10:00:00Z'),
    updatedAt: new Date('2026-08-01T10:00:00Z'),
  };

  const notification2: Notification = {
    id: 'notification-2',
    userId: 'user-1',
    type: 'PROMOTION',
    title: 'New Promotion',
    message: 'Check out our latest promotion.',
    isRead: true,
    link: '/promotions/1',
    createdAt: new Date('2026-08-02T10:00:00Z'),
    updatedAt: new Date('2026-08-02T10:00:00Z'),
  };

  const notifications = [notification1, notification2];

  const getAllNotificationsResponse: GetAllNotificationsRES = {
    status: true,
    code: 200,
    message: 'Notifications retrieved successfully',
    payload: {
      data: notifications,
      metadata: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      },
    },
  };

  const unreadCountResponse: UnreadNotificationsCountRES = {
    status: true,
    code: 200,
    payload: {
      unreadCount: 1,
    },
  };

  const actionResponse: NotificationActionResponse = {
    status: true,
    code: 200,
    message: 'Success',
  };

  const readNotificationResponse: ReadNotificationRES = {
    status: true,
    code: 200,
    payload: {
      notification: {
        ...notification1,
        isRead: true,
      },
    },
  };

  beforeEach(() => {
    notificationsApiService = {
      getAllNotifications: vi.fn(),
      getUnreadNotificationsCount: vi.fn(),
      MarkNotificationAsRead: vi.fn(),
      MarkAllAsRead: vi.fn(),
      DeleteNotification: vi.fn(),
      DeleteAllNotifications: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        NotificationsFacadeService,
        {
          provide: NotificationsApiService,
          useValue: notificationsApiService,
        },
      ],
    });

    service = TestBed.inject(NotificationsFacadeService);
  });

  describe('creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with the correct default state', () => {
      expect(service.notificationsList()).toEqual([]);
      expect(service.unreadNotificationsCount()).toBe(0);
      expect(service.getNotificationsLoading()).toBe(false);
    });
  });

  describe('getAllNotifications', () => {
    it('should get notifications and update the notifications list', () => {
      notificationsApiService.getAllNotifications.mockReturnValue(of(getAllNotificationsResponse));

      service.getAllNotifications();

      expect(notificationsApiService.getAllNotifications).toHaveBeenCalledTimes(1);
      expect(service.notificationsList()).toEqual(notifications);
    });

    it('should set loading to true while getting notifications', () => {
      const notificationsSubject = new Subject<GetAllNotificationsRES>();

      notificationsApiService.getAllNotifications.mockReturnValue(
        notificationsSubject.asObservable(),
      );

      service.getAllNotifications();

      expect(service.getNotificationsLoading()).toBe(true);

      notificationsSubject.next(getAllNotificationsResponse);
      notificationsSubject.complete();

      expect(service.getNotificationsLoading()).toBe(false);
    });

    it('should set loading to false when the request fails', () => {
      notificationsApiService.getAllNotifications.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.getAllNotifications();

      expect(service.getNotificationsLoading()).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getUnreadNotificationsCount', () => {
    it('should update the unread notifications count', () => {
      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service.getUnreadNotificationsCount();

      expect(notificationsApiService.getUnreadNotificationsCount).toHaveBeenCalledTimes(1);

      expect(service.unreadNotificationsCount()).toBe(1);
    });

    it('should not change the unread count when the request fails', () => {
      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.getUnreadNotificationsCount();

      expect(service.unreadNotificationsCount()).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('readNotification', () => {
    beforeEach(() => {
      service.getAllNotifications = vi.fn();
    });

    it('should optimistically mark the notification as read', () => {
      service['notificationsListState'].set(notifications);

      const requestSubject = new Subject<ReadNotificationRES>();

      notificationsApiService.MarkNotificationAsRead.mockReturnValue(requestSubject.asObservable());

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service.readNotification('notification-1');

      expect(service.notificationsList()).toEqual([
        {
          ...notification1,
          isRead: true,
        },
        notification2,
      ]);

      requestSubject.next(readNotificationResponse);
      requestSubject.complete();
    });

    it('should call MarkNotificationAsRead with the correct id and body', () => {
      notificationsApiService.MarkNotificationAsRead.mockReturnValue(of(readNotificationResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.readNotification('notification-1');

      expect(notificationsApiService.MarkNotificationAsRead).toHaveBeenCalledWith(
        'notification-1',
        {
          isRead: true,
        },
      );
    });

    it('should refresh the unread count after successfully reading a notification', () => {
      notificationsApiService.MarkNotificationAsRead.mockReturnValue(of(readNotificationResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.readNotification('notification-1');

      expect(notificationsApiService.getUnreadNotificationsCount).toHaveBeenCalledTimes(1);

      expect(service.unreadNotificationsCount()).toBe(1);
    });

    it('should revert the notification state when the request fails', () => {
      notificationsApiService.MarkNotificationAsRead.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      service['notificationsListState'].set(notifications);

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.readNotification('notification-1');

      expect(service.notificationsList()).toEqual(notifications);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('markAllAsRead', () => {
    it('should call MarkAllAsRead', () => {
      notificationsApiService.MarkAllAsRead.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.markAllAsRead();

      expect(notificationsApiService.MarkAllAsRead).toHaveBeenCalledTimes(1);
    });

    it('should mark all notifications as read after success', () => {
      notificationsApiService.MarkAllAsRead.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.markAllAsRead();

      expect(service.notificationsList()).toEqual([
        {
          ...notification1,
          isRead: true,
        },
        {
          ...notification2,
          isRead: true,
        },
      ]);
    });

    it('should refresh the unread count after successfully marking all as read', () => {
      notificationsApiService.MarkAllAsRead.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.markAllAsRead();

      expect(notificationsApiService.getUnreadNotificationsCount).toHaveBeenCalledTimes(1);
    });

    it('should not change the notifications list when the request fails', () => {
      notificationsApiService.MarkAllAsRead.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      service['notificationsListState'].set(notifications);

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.markAllAsRead();

      expect(service.notificationsList()).toEqual(notifications);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('deleteNotification', () => {
    it('should call DeleteNotification with the correct id', () => {
      notificationsApiService.DeleteNotification.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteNotification('notification-1');

      expect(notificationsApiService.DeleteNotification).toHaveBeenCalledWith('notification-1');
    });

    it('should remove the notification after successful deletion', () => {
      notificationsApiService.DeleteNotification.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteNotification('notification-1');

      expect(service.notificationsList()).toEqual([notification2]);
    });

    it('should refresh the unread count after successful deletion', () => {
      notificationsApiService.DeleteNotification.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteNotification('notification-1');

      expect(notificationsApiService.getUnreadNotificationsCount).toHaveBeenCalledTimes(1);
    });

    it('should not change the notifications list when deletion fails', () => {
      notificationsApiService.DeleteNotification.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      service['notificationsListState'].set(notifications);

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.deleteNotification('notification-1');

      expect(service.notificationsList()).toEqual(notifications);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('deleteAllNotifications', () => {
    it('should call DeleteAllNotifications', () => {
      notificationsApiService.DeleteAllNotifications.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteAllNotifications();

      expect(notificationsApiService.DeleteAllNotifications).toHaveBeenCalledTimes(1);
    });

    it('should clear the notifications list after successful deletion', () => {
      notificationsApiService.DeleteAllNotifications.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteAllNotifications();

      expect(service.notificationsList()).toEqual([]);
    });

    it('should refresh the unread count after successful deletion', () => {
      notificationsApiService.DeleteAllNotifications.mockReturnValue(of(actionResponse));

      notificationsApiService.getUnreadNotificationsCount.mockReturnValue(of(unreadCountResponse));

      service['notificationsListState'].set(notifications);

      service.deleteAllNotifications();

      expect(notificationsApiService.getUnreadNotificationsCount).toHaveBeenCalledTimes(1);
    });

    it('should not clear the notifications list when deletion fails', () => {
      notificationsApiService.DeleteAllNotifications.mockReturnValue(
        throwError(() => new Error('Request failed')),
      );

      service['notificationsListState'].set(notifications);

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      service.deleteAllNotifications();

      expect(service.notificationsList()).toEqual(notifications);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
