
import { Location } from './Location';

export interface Reservation {
  locationId: number;
  startDate: Date;
  endDate: Date;
  durationInDays: number;
}
