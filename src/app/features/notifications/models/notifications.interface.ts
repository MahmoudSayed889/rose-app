// GET ALL NOTIFICATIONS
export interface GetAllNotificationsRES {
  status: boolean;
  code: number;
  message: string;
  payload: GetAllNotificationsPayload;
}

interface GetAllNotificationsPayload {
  data: Notification[];
  metadata: Metadata;
}

interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

type NotificationType = 'ORDER' | 'PROMOTION' | 'SYSTEM' | 'REVIEW' | 'OTHER';

// UNREAD NOTIFICATIONS COUNT
export interface UnreadNotificationsCountRES {
  status: boolean;
  code: number;
  payload: UnreadNotificationsCountPayload;
}

interface UnreadNotificationsCountPayload {
  unreadCount: number;
}

// READ NOTIFICATION
export interface ReadNotificationREQ {
  isRead: boolean;
}

export interface ReadNotificationRES {
  status: boolean;
  code: number;
  payload: ReadNotificationPayload;
}

interface ReadNotificationPayload {
  notification: Notification;
}

// READ ALL NOTIFICATIONS & DELETE NOTIFICATION & DELETE ALL NOTIFICATIONS
export interface NotificationActionResponse {
  status: boolean;
  code: number;
  message: string;
}
