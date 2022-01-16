import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { TaxisNearbyController } from "./taxis-nearby.controller";
import { TaxisNearbyService } from "./taxis-nearby.service";

describe("TaxisNearbyController", () => {
  let controller: TaxisNearbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ HttpModule ],
      controllers: [ TaxisNearbyController ],
      providers: [ TaxisNearbyService ]
    }).compile();

    controller = module.get<TaxisNearbyController>(TaxisNearbyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
