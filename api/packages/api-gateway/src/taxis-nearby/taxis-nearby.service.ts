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
   * Find all nearby drivers
   *
   * Hits the Splyt drivers endpoint until a list of the driver locations grouped
   * by their ETA is compiled.
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
