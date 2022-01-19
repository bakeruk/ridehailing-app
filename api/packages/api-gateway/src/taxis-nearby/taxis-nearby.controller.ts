import {
  Controller, Get, Query
} from "@nestjs/common";

import { FindAllDriversDto, DriversNearbyEtas } from "@packages/splyt-taxis";

import { TaxisNearbyService } from "./taxis-nearby.service";

/**
 * Taxis nearby controller
 */
@Controller("taxis-nearby")
export class TaxisNearbyController {
  private readonly taxisNearbyService: TaxisNearbyService;

  /**
   * Instantiates the class
   *
   * @param taxisNearbyService - The taxis-nearby.service instance
   */
  constructor(taxisNearbyService: TaxisNearbyService) {
    this.taxisNearbyService = taxisNearbyService;
  }

  /**
   * Finds all the nearby drivers around the given coordinates
   *
   * @param query - Query paramters containing the coordinates and filter attributes for location nearby taxis
   * @returns An array of nearby taxis grouped by their ETA
   */
  @Get()
  async findAll(@Query() query: FindAllDriversDto): Promise<DriversNearbyEtas> {
    // TODO: add trycatch that returns an error response rather than a hard error
    return this.taxisNearbyService.findAll(query);
  }
}
