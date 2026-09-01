import { Component, input, output, Pipe, PipeTransform, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NotificationsFacadeService } from './services/notifications-facade.service';
import { Notification } from './models/notifications.interface';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { EmptyNotificationsComponent } from './components/empty-notifications/empty-notifications.component';
import { NotificationsLoadingComponent } from './components/notifications-loading/notifications-loading.component';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'translate',
  standalone: true,
})
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Component({
  selector: 'app-notification-card',
  standalone: true,
  template: '',
})
class MockNotificationCardComponent {
  notification = input.required<Notification>();

  onDelete = output<string>();
  onRead = output<string>();
}

@Component({
  selector: 'app-empty-notifications',
  standalone: true,
  template: '',
})
class MockEmptyNotificationsComponent {}

@Component({
  selector: 'app-notifications-loading',
  standalone: true,
  template: '',
})
class MockNotificationsLoadingComponent {}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  let facade: {
    notificationsList: ReturnType<typeof signal>;
    unreadNotificationsCount: ReturnType<typeof signal>;
    getNotificationsLoading: ReturnType<typeof signal>;
    getAllNotifications: ReturnType<typeof vi.fn>;
    deleteAllNotifications: ReturnType<typeof vi.fn>;
    markAllAsRead: ReturnType<typeof vi.fn>;
    deleteNotification: ReturnType<typeof vi.fn>;
    readNotification: ReturnType<typeof vi.fn>;
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

  beforeEach(async () => {
    facade = {
      notificationsList: signal<Notification[]>([]),
      unreadNotificationsCount: signal(0),
      getNotificationsLoading: signal(false),

      getAllNotifications: vi.fn(),
      deleteAllNotifications: vi.fn(),
      markAllAsRead: vi.fn(),
      deleteNotification: vi.fn(),
      readNotification: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
      providers: [
        {
          provide: NotificationsFacadeService,
          useValue: facade,
        },
      ],
    })
      .overrideComponent(NotificationsComponent, {
        remove: {
          imports: [
            NotificationCardComponent,
            EmptyNotificationsComponent,
            NotificationsLoadingComponent,
            TranslatePipe,
          ],
        },
        add: {
          imports: [
            MockNotificationCardComponent,
            MockEmptyNotificationsComponent,
            MockNotificationsLoadingComponent,
            MockTranslatePipe,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should get all notifications on initialization', () => {
      expect(facade.getAllNotifications).toHaveBeenCalledTimes(1);
    });
  });

  describe('notifications list', () => {
    it('should display the empty notifications component when the list is empty', () => {
      facade.notificationsList.set([]);
      facade.getNotificationsLoading.set(false);

      fixture.detectChanges();

      const emptyComponent = fixture.nativeElement.querySelector('app-empty-notifications');

      expect(emptyComponent).toBeTruthy();
    });

    it('should display the loading component while notifications are loading', () => {
      facade.getNotificationsLoading.set(true);

      fixture.detectChanges();

      const loadingComponent = fixture.nativeElement.querySelector('app-notifications-loading');

      expect(loadingComponent).toBeTruthy();

      expect(fixture.nativeElement.querySelector('app-empty-notifications')).toBeNull();

      expect(fixture.nativeElement.querySelector('app-notification-card')).toBeNull();
    });

    it('should display notification cards when notifications exist', () => {
      facade.notificationsList.set([notification1, notification2]);
      facade.getNotificationsLoading.set(false);

      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('app-notification-card');

      expect(cards.length).toBe(2);
    });

    it('should not display the empty component when notifications exist', () => {
      facade.notificationsList.set([notification1]);
      facade.getNotificationsLoading.set(false);

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('app-empty-notifications')).toBeNull();
    });
  });

  describe('header', () => {
    it('should display the number of notifications', () => {
      facade.notificationsList.set([notification1, notification2]);

      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h2');

      expect(heading.textContent).toContain('(2)');
    });
  });

  describe('delete all notifications', () => {
    it('should call deleteAllNotifications when the button is clicked', () => {
      facade.notificationsList.set([notification1]);
      facade.getNotificationsLoading.set(false);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const deleteAllButton = buttons[0] as HTMLButtonElement;

      expect(deleteAllButton.disabled).toBe(false);

      deleteAllButton.click();

      expect(facade.deleteAllNotifications).toHaveBeenCalledTimes(1);
    });

    it('should disable delete all when there are no notifications', () => {
      facade.notificationsList.set([]);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const deleteAllButton = buttons[0] as HTMLButtonElement;

      expect(deleteAllButton.disabled).toBe(true);
    });

    it('should disable delete all while notifications are loading', () => {
      facade.notificationsList.set([notification1]);
      facade.getNotificationsLoading.set(true);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const deleteAllButton = buttons[0] as HTMLButtonElement;

      expect(deleteAllButton.disabled).toBe(true);
    });
  });

  describe('mark all as read', () => {
    it('should call markAllAsRead when the button is clicked', () => {
      facade.notificationsList.set([notification1]);
      facade.unreadNotificationsCount.set(1);
      facade.getNotificationsLoading.set(false);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const markAllButton = buttons[1] as HTMLButtonElement;

      expect(markAllButton.disabled).toBe(false);

      markAllButton.click();

      expect(facade.markAllAsRead).toHaveBeenCalledTimes(1);
    });

    it('should disable mark all as read when there are no unread notifications', () => {
      facade.notificationsList.set([notification1]);
      facade.unreadNotificationsCount.set(0);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const markAllButton = buttons[1] as HTMLButtonElement;

      expect(markAllButton.disabled).toBe(true);
    });

    it('should disable mark all as read while notifications are loading', () => {
      facade.notificationsList.set([notification1]);
      facade.unreadNotificationsCount.set(1);
      facade.getNotificationsLoading.set(true);

      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const markAllButton = buttons[1] as HTMLButtonElement;

      expect(markAllButton.disabled).toBe(true);
    });
  });

  describe('notification card events', () => {
    it('should call deleteNotification when a notification card emits onDelete', () => {
      facade.notificationsList.set([notification1]);

      fixture.detectChanges();

      const card = fixture.debugElement.query(
        (debugElement) => debugElement.nativeElement.tagName === 'APP-NOTIFICATION-CARD',
      );

      const cardComponent = card.componentInstance as MockNotificationCardComponent;

      cardComponent.onDelete.emit(notification1.id);

      expect(facade.deleteNotification).toHaveBeenCalledWith(notification1.id);
    });

    it('should call readNotification when a notification card emits onRead', () => {
      facade.notificationsList.set([notification1]);

      fixture.detectChanges();

      const card = fixture.debugElement.query(
        (debugElement) => debugElement.nativeElement.tagName === 'APP-NOTIFICATION-CARD',
      );

      const cardComponent = card.componentInstance as MockNotificationCardComponent;

      cardComponent.onRead.emit(notification1.id);

      expect(facade.readNotification).toHaveBeenCalledWith(notification1.id);
    });
  });
});
