import { Component, computed, input, output, signal } from '@angular/core';
import { Notification } from '../../models/notifications.interface';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-card',
  imports: [OverlayModule, TranslatePipe],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  notification = input.required<Notification>();
  optionsOpen = signal<boolean>(false);

  onRead = output<string>();
  onDelete = output<string>();

  markAsRead() {
    this.onRead.emit(this.notification().id);
    this.optionsOpen.set(false);
  }

  deleteNotification() {
    this.onDelete.emit(this.notification().id);
    this.optionsOpen.set(false);
  }

  cardStyle = computed(() =>
    this.notification().isRead
      ? 'bg-zinc-200 dark:bg-zinc-800'
      : 'hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60',
  );
}
