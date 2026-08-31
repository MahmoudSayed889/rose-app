import { Component, inject, OnInit } from '@angular/core';
import { NotificationsFacadeService } from './services/notifications-facade.service';
import { EmptyNotificationsComponent } from './components/empty-notifications/empty-notifications.component';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { NotificationsLoadingComponent } from './components/notifications-loading/notifications-loading.component';

@Component({
  selector: 'app-notifications',
  imports: [NotificationCardComponent, EmptyNotificationsComponent, NotificationsLoadingComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  protected readonly notificationsFacadeService = inject(NotificationsFacadeService);

  ngOnInit(): void {
    this.notificationsFacadeService.getAllNotifications();
  }
}
