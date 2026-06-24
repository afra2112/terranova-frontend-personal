import type { ID, ISODateTime } from "./common";

/**
 * Reservation lifecycle. WAITING is used for waitlists: when a CONFIRMED
 * reservation is cancelled, the backend promotes the first WAITING attendee.
 */
export type AttendanceStatus =
  | "CONFIRMED"
  | "CANCELLED"
  | "ATTENDED"
  | "NO_SHOW"
  | "WAITING";

/**
 * An Attendance is the ownership record of a single buyer reservation.
 * One attendance === one buyer reservation for one appointment.
 *
 * In the sold-product workflow, an `attendanceId` is enough to identify the
 * buyer + appointment + product relationship; the backend handles validation.
 */
export interface Attendance {
  attendanceId: ID;
  appointmentId: ID;
  userId: ID;
  status: AttendanceStatus;
  inscriptionDate: ISODateTime;
}

/** Attendee row enriched with buyer info for the seller's management views. */
export interface AttendeeView extends Attendance {
  buyerName: string;
  buyerAvatarUrl?: string;
  buyerPhone?: string;
}
