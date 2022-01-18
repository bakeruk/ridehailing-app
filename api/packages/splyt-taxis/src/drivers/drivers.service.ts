import { Injectable } from "@nestjs/common";

import { SplytDrivers } from "@libs/splyt-api";

import { FindAllDriversDto } from "./dto";
import { DriversNearbyEtas } from "./interfaces";

/**
 * Drivers service
 */
@Injectable()
export class DriversService {
  private readonly splytDriversApi: SplytDrivers.Drivers;

  /**
   * Instantiates the class
   */
  constructor() {
    this.splytDriversApi = new SplytDrivers.Drivers();
  }

  /**
   * Find all nearby drivers
   *
   * Hits the Splyt drivers endpoint until a list of the driver locations grouped
   * by their ETA is compiled.
   */
  async findAll(params: FindAllDriversDto): Promise<DriversNearbyEtas> {
    const maxEta = params.maxEta || 7;
    const maxDriversPerEta = params.numberOfVehicles || 10;
    const maxAttempts = 30;
    const driversNearbyEtas: DriversNearbyEtas = [];
    let attempts = 0;

    // Continue to hit the Splyt drivers endpoint until we get a complete list
    // of drivers grouped by their ETA. Or until we hit our maxAttempts
    while (!(driversNearbyEtas.length === maxEta || attempts === maxAttempts)) {
      // Increment the attempts values
      attempts++;

      // Perform a blind ETA request
      const etaDrivers = await this.splytDriversApi.nearby(params.latitude, params.longitude, maxDriversPerEta);

      // If the etaDrivers response has a set of drivers with an ETA which is
      // not in our driversNearbyEtas list, add it.
      if (!driversNearbyEtas.find(data => data.pickup_eta === etaDrivers.pickup_eta)) {
        driversNearbyEtas.push(etaDrivers);
      }
    }

    // Sort the results by ascending ETA
    driversNearbyEtas.sort((a, b) => a.pickup_eta - b.pickup_eta);

    return driversNearbyEtas;
  }
}