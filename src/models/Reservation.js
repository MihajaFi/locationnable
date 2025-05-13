class Reservation {
    constructor(locationId, startDate, endDate, durationInDays) {
      this.locationId = locationId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.durationInDays = durationInDays;
    }
  }
  
  module.exports = Reservation;