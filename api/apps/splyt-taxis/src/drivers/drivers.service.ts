import { Injectable } from "@nestjs/common";

import { SplytApiService, DriversNearbyAttributes } from "../common/providers/splyt-api";
import { FindAllDriversDto } from "./dto/find-all-drivers.dto";

/**
 * Drivers service
 */
@Injectable()
export class DriversService {
  private splytApiService: SplytApiService;

  /**
   * Instantiates the class
   *
   * @param httpService - A Splyt API instance
   */
  constructor(splytApiService: SplytApiService) {
    this.splytApiService = splytApiService;
  }

  /**
   * Find all nearby drivers
   */
  async findAll(params: FindAllDriversDto): Promise<DriversNearbyAttributes> {
    const res = await this.splytApiService.request<DriversNearbyAttributes>({
      url: "/drivers",
      params
    });

    return res.data;
  }
}