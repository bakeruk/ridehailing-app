import { Test, TestingModule } from "@nestjs/testing";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";

describe("ApiGatewayController", () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const apiGatewayModule: TestingModule = await Test.createTestingModule({
      controllers: [ ApiGatewayController ],
      providers: [ ApiGatewayService ]
    }).compile();

    apiGatewayController = apiGatewayModule.get<ApiGatewayController>(ApiGatewayController);
  });

  describe("GET /", () => {
    it("should return \"OK\"", () => {
      expect(apiGatewayController.getHealthStatus()).toBe("OK");
    });
  });
});
