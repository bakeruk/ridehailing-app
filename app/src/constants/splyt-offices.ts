export type SplytOffices = SplytOfficeAttributes[];

export interface SplytOfficeAttributes {
  readonly label: string;
  readonly name: string;
  readonly coords: Pick<GeolocationCoordinates, "latitude" | "longitude">;
}

/**
 * Splyt office data
 */
export const SPLYT_OFFICES: SplytOffices = [
  {
    label: "London",
    name: "london",
    coords: {
      latitude: 51.5049375,
      longitude: -0.0964509
    }
  },
  {
    label: "Singapore",
    name: "singapore",
    coords: {
      latitude: 1.285194,
      longitude: 103.8522982
    }
  }
];