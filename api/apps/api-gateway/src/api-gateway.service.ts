import { Injectable } from "@nestjs/common";

/**
 * Api gateway service
 */
@Injectable()
export class ApiGatewayService {
  /**
   * Gets health status
   */
  getHealthStatus(): string {
    return "OK";
  }
}
