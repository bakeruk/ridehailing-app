import { Controller, Get } from "@nestjs/common";

import { SplytTaxisService } from "./splyt-taxis.service";

/**
 * Splyt taxis controller
 */
@Controller()
export class SplytTaxisController {
  private readonly splytTaxisService: SplytTaxisService;

  /**
   * Instantiates the class
   *
   * @param splytTaxisService - A splyt-taxis.service instance
   */
  constructor(splytTaxisService: SplytTaxisService) {
    this.splytTaxisService = splytTaxisService;
  }

  /**
   * Gets the health status
   */
   @Get()
  getHealthStatus(): string {
    return this.splytTaxisService.getHealthStatus();
  }
}
