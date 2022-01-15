export interface DriversNearbyAttributes {
  pickup_eta: number;
  drivers: DriverAttributes[];
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