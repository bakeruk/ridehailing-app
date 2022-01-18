import { DriversNearbyEtas, FindAllDriversDto } from "@api/splyt-taxis";

import { AxiosInstance } from "axios";

import { AxiosHttpClient } from "./AxiosHttpClient";

/**
 * Nearby taxis API
 */
export class TaxisNearbyApi extends AxiosHttpClient {
  public httpInstance: AxiosInstance;

  constructor() {
    super();
    this.httpInstance = this.getHttpInstance();
  }

  async getNearbyTaxis(params: FindAllDriversDto): Promise<DriversNearbyEtas> {
    return await (await this.httpInstance.get("/taxis-nearby", { params })).data;
  }
}