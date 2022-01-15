import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

import type { AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * Splyt API service
 */
 @Injectable()
export class SplytApiService {
  private httpService: HttpService;

  /**
   * Instantiates the class
   *
   * @param httpService - A Axios HttpService
   */
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  /**
   * Gets health status
   */
  request<T>(axiosRequestConfig: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.httpService.request<T>({
        baseURL: process.env.SPLYT_API_URL,
        ...axiosRequestConfig
      }).subscribe({
        next: res => resolve(res),
        error: err => reject(err)
      });
    });
  }
}
