import type { ID, ISODateTime } from "./common";

/**
 * Notifications are not fully implemented on the backend yet. This type exists
 * so the architecture can support them later without refactoring. Keep it
 * forward-compatible.
 */
export type NotificationType =
  | "APPOINTMENT_REMINDER"
  | "APPOINTMENT_CANCELLED"
  | "PRODUCT_SOLD"
  | "WAITLIST_PROMOTED"
  | "SYSTEM";

export interface AppNotification {
  id: ID;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  /** Optional deep-link target within the app. */
  href?: string;
  createdAt: ISODateTime;
}
