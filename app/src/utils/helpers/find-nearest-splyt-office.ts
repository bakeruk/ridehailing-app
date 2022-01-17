import haversine from "haversine";

import { SPLYT_OFFICES, SplytOfficeAttributes } from "src/constants";

interface OfficeWithDistanceAttributes extends SplytOfficeAttributes {
  distanceKm: number;
}

/**
 * Finds the nearest office to the given geolocation co-ordinates
 *
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 * @param latitude - Geolocation latitude co-ordinate
 * @param longitude - Geolocation latitude co-ordinate
 * @returns A Splyt office object
 */
export const findNearestSplytOffice = (latitude: number, longitude: number): SplytOfficeAttributes => {
  // Go through each office and determine the distance between it and the given
  // coordinates
  const officesWithDistance: OfficeWithDistanceAttributes[] = SPLYT_OFFICES.map(office => {
    // Work out the distance between the given coordinates and the office using
    // the Haversine formula
    // @ts-ignore - Functional correct with "as" typing
    const distanceKm = haversine({
      latitude,
      longitude
    }, office.coords) as number;

    return {
      ...office,
      distanceKm
    };
  });

  // Sort the results by distance (ascending)
  const sortedOfficesWithDistance = officesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  const nearestOffice = sortedOfficesWithDistance[ 0 ];

  // Remove the distance attribute
  delete nearestOffice.distanceKm;

  return nearestOffice;
};