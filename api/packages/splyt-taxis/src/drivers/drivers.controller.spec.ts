/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from "@nestjs/testing";

import { DriversController } from "./drivers.controller";
import { findAlldriversStandardFixture, findAlldriversMaxEtaFixture } from "./drivers.controller.fixture";
import { DriversService } from "./drivers.service";
import { FindAllDriversDto } from "./dto";
import { DriversNearbyEtas } from "./interfaces";

describe("DriversController", () => {
  let driversController: DriversController;
  let driversService: DriversService;

  beforeEach(async () => {
    const driversModule: TestingModule = await Test.createTestingModule({
      controllers: [ DriversController ],
      providers: [ DriversService ]
    }).compile();

    driversController = driversModule.get<DriversController>(DriversController);
    driversService = driversModule.get<DriversService>(DriversService);
  });

  describe("GET /drivers", () => {
    let spyOn: jest.SpyInstance<Promise<DriversNearbyEtas>, [params: FindAllDriversDto]>;

    beforeEach(async () => {
      // SpyOn the driversService.findAll method
      spyOn = jest.spyOn(driversService, "findAll");
    });

    it("should return a lists of drivers", () => {
      spyOn.mockImplementation(async () => findAlldriversStandardFixture.expect);
      expect(driversController.findAll(findAlldriversStandardFixture.params)).resolves.toEqual(findAlldriversStandardFixture.expect);
    });

    it("should return a lists of drivers with an ETA within 2 minutes", () => {
      spyOn.mockImplementation(async () => findAlldriversMaxEtaFixture.expect);
      expect(driversController.findAll(findAlldriversMaxEtaFixture.params)).resolves.toEqual(findAlldriversMaxEtaFixture.expect);
    });
  });
});
