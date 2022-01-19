import { Injectable } from "@nestjs/common";

/**
 * Api gateway service
 */
@Injectable()
export class ApiGatewayService {
  /**
   * Gets the health status
   *
   * @returns A simple OK message
   */
  getHealthStatus(): string {
    return "OK";
  }
}
