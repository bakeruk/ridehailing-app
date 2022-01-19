import {
  Query, Controller, Get
} from "@nestjs/common";

import { DriversService } from "./drivers.service";
import { FindAllDriversDto } from "./dto";
import { DriversNearbyEtas } from "./interfaces";

/**
 * Drivers controller
 */
@Controller("drivers")
export class DriversController {
  private readonly driversService: DriversService;

  /**
   * Instantiates the class
   *
   * @param driversService - A drivers.service instance
   */
  constructor(driversService: DriversService) {
    this.driversService = driversService;
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
    return await this.driversService.findAll(query);
  }
}
