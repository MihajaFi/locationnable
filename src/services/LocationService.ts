
import { Location, LocationType } from "../models/Location";

export class LocationService {
  private locations: Location[];

  constructor() {
    this.locations = [];
  }

  addLocation(location: Location): void {
    this.locations.push(location);
  }

  listLocations(): Location[] {
    return this.locations;
  }

  getLocationById(id: number): Location | undefined {
    return this.locations.find(location => location.id === id);
  }
}
