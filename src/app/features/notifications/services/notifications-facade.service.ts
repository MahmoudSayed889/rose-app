import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Notification } from '../models/notifications.interface';
import { NotificationsApiService } from './notifications-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Service()
export class NotificationsFacadeService {
  private readonly notificationsApiService = inject(NotificationsApiService);
  private readonly destroyRef = inject(DestroyRef);

  private unreadNotificationsCountState = signal<number>(0);
  public unreadNotificationsCount = this.unreadNotificationsCountState.asReadonly();

  private notificationsListState = signal<Notification[]>([]);
  public notificationsList = this.notificationsListState.asReadonly();

  private getNotificationsLoadingState = signal<boolean>(false);
  public getNotificationsLoading = this.getNotificationsLoadingState.asReadonly();

  getAllNotifications(): void {
    this.getNotificationsLoadingState.set(true);

    this.notificationsApiService
      .getAllNotifications()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.getNotificationsLoadingState.set(false)),
      )
      .subscribe({
        next: (res) => {
          this.notificationsListState.set(res.payload.data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getUnreadNotificationsCount(): void {
    this.notificationsApiService
      .getUnreadNotificationsCount()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.unreadNotificationsCountState.set(res.payload.unreadCount);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private reverseIsReadState(id: string): void {
    this.notificationsListState.update((notifications) =>
      notifications.map((n) => {
        if (n.id !== id) return n;

        return { ...n, isRead: !n.isRead };
      }),
    );
  }

  readNotification(id: string): void {
    this.reverseIsReadState(id);

    this.notificationsApiService
      .MarkNotificationAsRead(id, { isRead: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.getUnreadNotificationsCount();
        },
        error: (err) => {
          this.reverseIsReadState(id);
          console.log(err);
        },
      });
  }

  markAllAsRead(): void {
    this.notificationsApiService
      .MarkAllAsRead()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notificationsListState.update((current) =>
            current.map((n) => {
              return { ...n, isRead: true };
            }),
          );
          this.getUnreadNotificationsCount();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteNotification(id: string): void {
    this.notificationsApiService
      .DeleteNotification(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notificationsListState.update((current) => current.filter((n) => n.id !== id));
          this.getUnreadNotificationsCount();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAllNotifications(): void {
    this.notificationsApiService
      .DeleteAllNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notificationsListState.set([]);
          this.getUnreadNotificationsCount();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
