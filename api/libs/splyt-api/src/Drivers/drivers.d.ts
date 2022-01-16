export interface DriversNearbyResult {
  readonly pickup_eta: number;
  readonly drivers: DriverAttributes[];
}

export interface DriverAttributes {
  driver_id: string;
  location: DriverGeoLocation;
}

export interface DriverGeoLocation {
  latitude: number;
  longitude: number;
  bearing: number
}