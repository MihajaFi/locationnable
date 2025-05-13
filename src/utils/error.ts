
export class LocationNotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "LocationNotFoundError";
    }
  }
  
  export class LocationUnavailableError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "LocationUnavailableError";
    }
  }
  
  export class InvalidReservationDurationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidReservationDurationError";
    }
  }
  
// src/errors.ts
export class LocationAlreadyReservedError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "LocationAlreadyReservedError";
    }
  }
  