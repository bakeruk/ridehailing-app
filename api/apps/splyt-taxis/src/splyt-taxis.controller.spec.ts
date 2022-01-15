import { Test, TestingModule } from "@nestjs/testing";

import { SplytTaxisController } from "./splyt-taxis.controller";
import { SplytTaxisService } from "./splyt-taxis.service";

describe("SplytTaxisController", () => {
  let splytTaxisController: SplytTaxisController;

  beforeEach(async () => {
    const splytTaxisModule: TestingModule = await Test.createTestingModule({
      controllers: [ SplytTaxisController ],
      providers: [ SplytTaxisService ]
    }).compile();

    splytTaxisController = splytTaxisModule.get<SplytTaxisController>(SplytTaxisController);
  });

  describe("GET /", () => {
    it("should return \"OK\"", () => {
      expect(splytTaxisController.getHealthStatus()).toBe("OK");
    });
  });
});
