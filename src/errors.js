class LocationNotFoundError extends Error {}
class LocationUnavailableError extends Error {}
class InvalidReservationDurationError extends Error {}
class LocationAlreadyReservedError extends Error {}

module.exports = {
  LocationNotFoundError,
  LocationUnavailableError,
  InvalidReservationDurationError,
  LocationAlreadyReservedError
};