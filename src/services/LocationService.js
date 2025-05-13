class LocationService {
    constructor() {
      this.locations = [];
    }
  
    addLocation(location) {
      this.locations.push(location);
    }
  
    listLocations() {
      return this.locations;
    }
  
    getLocationById(id) {
      return this.locations.find(location => location.id === id);
    }
  }
  
  module.exports = LocationService;