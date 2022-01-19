import { Injectable } from "@nestjs/common";

/**
 * Splyt taxis service
 */
@Injectable()
export class SplytTaxisService {
  /**
   * Gets the health status
   *
   * @returns A simple OK message
   */
  getHealthStatus(): string {
    return "OK";
  }
}
