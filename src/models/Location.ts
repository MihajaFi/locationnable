
export enum LocationType {
    Vehicle = "vehicle",
    Property = "property",
    Equipment = "equipment"
  }
  
  export interface Location {
    id: number;
    name: string;
    type: LocationType;
    available: boolean;
  }
  