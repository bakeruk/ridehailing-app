import { Controller, Get } from "@nestjs/common";

import { ApiGatewayService } from "./api-gateway.service";

/**
 * Api gateway controller
 */
@Controller()
export class ApiGatewayController {
  private readonly apiGatewayService: ApiGatewayService;

  /**
   * Instantiates the class
   *
   * @param apiGatewayService - An api-gateway.service instance
   */
  constructor(apiGatewayService: ApiGatewayService) {
    this.apiGatewayService = apiGatewayService;
  }

  /**
   * Gets the health status
   */
  @Get()
  getHealthStatus(): string {
    return this.apiGatewayService.getHealthStatus();
  }
}
