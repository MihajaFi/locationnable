
import { Reservation } from "../models/Reservation";
import { LocationService } from "./LocationService";
import { LocationNotFoundError, LocationUnavailableError, InvalidReservationDurationError, LocationAlreadyReservedError } from "../utils/error"; // Import des erreurs personnalisées

export class ReservationService {
  private reservations: Reservation[] = [];
  private locationService: LocationService;

  constructor(locationService: LocationService) {
    this.locationService = locationService;
  }

  createReservation(locationId: number, startDate: Date, endDate: Date): string {
    const location = this.locationService.getLocationById(locationId);

    if (!location) {
      throw new LocationNotFoundError(`La location avec l'ID ${locationId} n'a pas été trouvée.`);
    }

    if (!location.available) {
      throw new LocationUnavailableError(`La location "${location.name}" n'est pas disponible.`);
    }

    const isReserved = this.reservations.some((reservation) => {
      return (
        reservation.locationId === locationId &&
        ((startDate >= reservation.startDate && startDate <= reservation.endDate) ||
          (endDate >= reservation.startDate && endDate <= reservation.endDate))
      );
    });

    if (isReserved) {
      throw new LocationAlreadyReservedError(`La location "${location.name}" est déjà réservée pendant cette période.`);
    }

    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    if (durationInDays < 1) {
      throw new InvalidReservationDurationError("La durée de la réservation doit être d'au moins 1 jour.");
    }

    const reservation: Reservation = {
      locationId,
      startDate,
      endDate,
      durationInDays
    };

    this.reservations.push(reservation);
    return `Réservation confirmée pour la location "${location.name}" pour ${durationInDays} jours.`;
  }

  listReservations(): Reservation[] {
    return this.reservations;
  }
}
