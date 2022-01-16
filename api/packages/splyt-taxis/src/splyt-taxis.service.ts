import { Injectable } from "@nestjs/common";

/**
 * Splyt taxis service
 */
@Injectable()
export class SplytTaxisService {
  /**
   * Gets health status
   */
  getHealthStatus(): string {
    return "OK";
  }
}
