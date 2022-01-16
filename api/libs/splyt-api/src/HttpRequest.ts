import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse
} from "axios";

/**
 * HTTP request class
 *
 * TODO: Add request tracing to monitor request/response timing and issues
 */
export class HttpRequest {
  private readonly HTTP_REQUEST_TIMEOUT = 10000;
  private readonly AxiosInstance: AxiosInstance;

  /**
   * Instantiates a new HTTP request instance
   */
  constructor(axiosRequestConfig?: AxiosRequestConfig) {
    // Creates a new Axios instance with pre-defined configuration
    this.AxiosInstance = axios.create({
      ...axiosRequestConfig,
      baseURL: process.env.SPLYT_API_URL,
      timeout: this.HTTP_REQUEST_TIMEOUT
    });
  }

  /**
   * Performs an Axios request with the given axiosRequestConfig
   */
  async request<T, D = any>(axiosRequestConfig: AxiosRequestConfig<D>): Promise<T> {
    let result: AxiosResponse<T, D>;

    // eslint-disable-next-line no-useless-catch
    try {
      result = await this.AxiosInstance(axiosRequestConfig);
    } catch (error) {
      // TODO: Add specific Splyt API error processor to standardise the error response
      throw error;
    }

    return result.data;
  }
}