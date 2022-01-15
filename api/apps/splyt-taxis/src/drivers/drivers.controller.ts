import {
  Query, Controller, Get
} from "@nestjs/common";

import type { DriversNearbyAttributes } from "../common/providers/splyt-api";
import { DriversService } from "./drivers.service";
import { FindAllDriversDto } from "./dto/find-all-drivers.dto";

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
  async findAll(@Query() query: FindAllDriversDto): Promise<DriversNearbyAttributes> {
    return await this.driversService.findAll(query);
  }
}
