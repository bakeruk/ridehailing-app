import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

import { DriversNearbyEtas, FindAllDriversDto } from "@packages/splyt-taxis";
import { AxiosRequestConfig } from "axios";

/**
 * Taxis nearby service
 */
@Injectable()
export class TaxisNearbyService {
  private httpService: HttpService;
  private readonly axiosRequestConfig: AxiosRequestConfig;

  /**
   * Instantiates the class
   *
   * @param httpService - A Axios HttpService instance
   */
  constructor(httpService: HttpService) {
    this.httpService = httpService;
    this.axiosRequestConfig = { baseURL: process.env.SPLYT_TAXIS_MICROSERVICE_URL };
  }

  /**
   * Finds all the nearby drivers around the given coordinates
   *
   * Hits the Splyt drivers endpoint until a list of the driver locations grouped
   * by their ETA is compiled.
   *
   * @param params - The parameters to perform a Splyt GET /api/drivers request
   * @returns An array of nearby taxis grouped by their ETA
   */
  async findAll(params: FindAllDriversDto): Promise<DriversNearbyEtas> {
    return new Promise((resolve, reject) => {
      this.httpService.request<DriversNearbyEtas>({
        url: "/drivers",
        method: "GET",
        params,
        ...this.axiosRequestConfig
      }).subscribe({
        next: res => resolve(res.data),
        error: err => reject(err)
      });
    });
  }
}
