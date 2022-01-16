import {
  Query, Controller, Get
} from "@nestjs/common";

import { DriversService } from "./drivers.service";
import { FindAllDriversDto } from "./dto";
import type { DriversNearbyEtas } from "./interfaces";

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
   * Gets the health status
   */
   @Get()
  async findAll(@Query() query: FindAllDriversDto): Promise<DriversNearbyEtas> {
    return await this.driversService.findAll(query);
  }
}
