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
   * Gets the health status
   */
  @Get()
  async findAll(@Query() query: FindAllDriversDto): Promise<DriversNearbyEtas> {
    return this.taxisNearbyService.findAll(query);
  }
}
