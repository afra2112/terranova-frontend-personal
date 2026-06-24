import type { ID, ISODate, TimeString } from "./common";

export type AppointmentStatus =
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "FINISHED"
  | "CANCELLED";

/** Reasons the backend may attach to an automatic cancellation. */
export type CancellationReason = "PRODUCT_SOLD" | "SELLER_CANCELLED";

/**
 * A scheduled visit window created by a seller for one of their products.
 *
 * Capacity invariant (computed by the backend):
 *   availableSlots = maxQuorum - takenSlots
 * A buyer cannot reserve when availableSlots === 0 (they may join a waitlist).
 */
export interface Appointment {
  id: ID;
  productId: ID;
  date: ISODate;
  startTime: TimeString;
  endTime: TimeString;
  maxQuorum: number;
  takenSlots: number;
  availableSlots: number;
  status: AppointmentStatus;
  description?: string;
  cancellationReason?: CancellationReason;
}
