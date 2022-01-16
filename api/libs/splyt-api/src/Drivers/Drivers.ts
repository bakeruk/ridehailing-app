import { HttpRequest } from "../HttpRequest";
import { DriversNearbyResult } from "./types/drivers";

/**
 * Drives class
 */
export class Drivers {
  private readonly HttpRequestInstance: HttpRequest;
  /**
   * Instantiates a new Drivers instance
   */
  constructor() {
    this.HttpRequestInstance = new HttpRequest();
  }

  /**
   * Retrieves the nearest drivers with the given co-ordinates
   *
   * @param latitude - Geolocation latitude
   * @param longitude - Geolocation longitude
   * @param count - The number of nearest cars to return
   * @returns DriversNearbyResult
   */
  async nearby(latitude: number, longitude: number, count?: number): Promise<DriversNearbyResult> {
    return await this.HttpRequestInstance.request<DriversNearbyResult>({
      url: "/drivers",
      params: {
        latitude,
        longitude,
        count: count || 10
      }
    });
  }
}