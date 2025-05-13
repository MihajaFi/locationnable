const { LocationNotFoundError, LocationUnavailableError, InvalidReservationDurationError, LocationAlreadyReservedError } = require("../errors");

class ReservationService {
  constructor(locationService) {
    this.reservations = [];
    this.locationService = locationService;
  }

  createReservation(locationId, startDate, endDate) {
    const location = this.locationService.getLocationById(locationId);

    if (!location) throw new LocationNotFoundError(`Location ${locationId} not found.`);
    if (!location.available) throw new LocationUnavailableError(`Location "${location.name}" not available.`);

    const isReserved = this.reservations.some(reservation =>
      reservation.locationId === locationId &&
      ((startDate >= reservation.startDate && startDate <= reservation.endDate) ||
       (endDate >= reservation.startDate && endDate <= reservation.endDate))
    );

    if (isReserved) throw new LocationAlreadyReservedError(`Location "${location.name}" already reserved.`);

    const duration = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    if (duration < 1) throw new InvalidReservationDurationError("Duration must be at least 1 day.");

    this.reservations.push({ locationId, startDate, endDate, duration });
    return `Reservation confirmed for "${location.name}" for ${duration} days.`;
  }

  listReservations() { return this.reservations; }
}

module.exports = ReservationService;