import { Test, TestingModule } from "@nestjs/testing";

import { TaxisNearbyController } from "./taxis-nearby.controller";

describe("TaxisNearbyController", () => {
  let controller: TaxisNearbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ controllers: [ TaxisNearbyController ] }).compile();

    controller = module.get<TaxisNearbyController>(TaxisNearbyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
