import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { NotificationCardComponent } from './notification-card.component';
import { Notification } from '../../models/notifications.interface';
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

describe('NotificationCardComponent', () => {
  let component: NotificationCardComponent;
  let fixture: ComponentFixture<NotificationCardComponent>;

  const unreadNotification: Notification = {
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

  const readNotification: Notification = {
    ...unreadNotification,
    id: 'notification-2',
    isRead: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCardComponent],
    })
      .overrideComponent(NotificationCardComponent, {
        remove: {
          imports: [TranslatePipe],
        },
        add: {
          imports: [MockTranslatePipe],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('notification', unreadNotification);
    fixture.detectChanges();
  });

  afterEach(() => {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer) {
      overlayContainer.innerHTML = '';
    }
  });

  describe('creation', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize optionsOpen as false', () => {
      expect(component.optionsOpen()).toBe(false);
    });
  });

  describe('template', () => {
    it('should display the notification title', () => {
      const title = fixture.nativeElement.querySelector('h4');

      expect(title.textContent.trim()).toBe(unreadNotification.title);
    });

    it('should display the notification message', () => {
      const message = fixture.nativeElement.querySelector('p');

      expect(message.textContent.trim()).toBe(unreadNotification.message);
    });

    it('should display the options button', () => {
      const button = fixture.nativeElement.querySelector(
        'button[aria-label="Notification options"]',
      );

      expect(button).toBeTruthy();
    });

    it('should set aria-expanded according to optionsOpen', () => {
      const button = fixture.nativeElement.querySelector(
        'button[aria-label="Notification options"]',
      );

      expect(button.getAttribute('aria-expanded')).toBe('false');

      component.optionsOpen.set(true);
      fixture.detectChanges();

      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should open the options menu when the options button is clicked', () => {
      const button = fixture.nativeElement.querySelector(
        'button[aria-label="Notification options"]',
      );

      button.click();
      fixture.detectChanges();

      expect(component.optionsOpen()).toBe(true);

      const menu = document.querySelector('[role="menu"]');

      expect(menu).toBeTruthy();
    });
  });

  describe('cardStyle', () => {
    it('should return the unread notification style', () => {
      fixture.componentRef.setInput('notification', unreadNotification);
      fixture.detectChanges();

      expect(component.cardStyle()).toBe('hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60');
    });

    it('should return the read notification style', () => {
      fixture.componentRef.setInput('notification', readNotification);
      fixture.detectChanges();

      expect(component.cardStyle()).toBe('bg-zinc-200 dark:bg-zinc-800');
    });
  });

  describe('markAsRead', () => {
    it('should emit the notification id', () => {
      const emitSpy = vi.spyOn(component.onRead, 'emit');

      component.markAsRead();

      expect(emitSpy).toHaveBeenCalledWith(unreadNotification.id);
    });

    it('should close the options menu', () => {
      component.optionsOpen.set(true);

      component.markAsRead();

      expect(component.optionsOpen()).toBe(false);
    });
  });

  describe('deleteNotification', () => {
    it('should emit the notification id', () => {
      const emitSpy = vi.spyOn(component.onDelete, 'emit');

      component.deleteNotification();

      expect(emitSpy).toHaveBeenCalledWith(unreadNotification.id);
    });

    it('should close the options menu', () => {
      component.optionsOpen.set(true);

      component.deleteNotification();

      expect(component.optionsOpen()).toBe(false);
    });
  });

  describe('read notification button', () => {
    it('should be enabled when the notification is unread', () => {
      component.optionsOpen.set(true);
      fixture.detectChanges();

      const button = document.querySelector('[role="menuitem"]') as HTMLButtonElement;

      expect(button).not.toBeNull();
      expect(button.disabled).toBe(false);
    });

    it('should be disabled when the notification is already read', () => {
      fixture.componentRef.setInput('notification', readNotification);
      component.optionsOpen.set(true);
      fixture.detectChanges();

      const button = document.querySelector('[role="menuitem"]') as HTMLButtonElement;

      expect(button).not.toBeNull();
      expect(button.disabled).toBe(true);
    });
  });

  describe('delete button', () => {
    it('should emit the notification id when clicked', () => {
      const emitSpy = vi.spyOn(component.onDelete, 'emit');

      component.optionsOpen.set(true);
      fixture.detectChanges();

      const menuItems = document.querySelectorAll('[role="menuitem"]');
      const deleteButton = menuItems[1] as HTMLButtonElement;

      expect(deleteButton).not.toBeNull();
      deleteButton.click();

      expect(emitSpy).toHaveBeenCalledWith(unreadNotification.id);
      expect(component.optionsOpen()).toBe(false);
    });
  });

  describe('overlay', () => {
    it('should close the menu when the backdrop is clicked', () => {
      component.optionsOpen.set(true);
      fixture.detectChanges();

      const backdrop = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      expect(backdrop).toBeTruthy();

      backdrop.click();
      fixture.detectChanges();

      expect(component.optionsOpen()).toBe(false);
    });
  });
});
