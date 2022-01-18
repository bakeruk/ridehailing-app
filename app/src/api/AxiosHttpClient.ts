import axios, { AxiosInstance } from "axios";

/**
 * AxiosHttpClient
 */
export class AxiosHttpClient {
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });
  }

  getHttpInstance() {
    return this.axiosInstance;
  }
}