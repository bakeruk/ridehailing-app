import { Test, TestingModule } from "@nestjs/testing";

import { SplytApiModule } from "../common/providers/splyt-api";
import { DriversController } from "./drivers.controller";
import { findAlldriversFixture } from "./drivers.controller.fixture";
import { DriversService } from "./drivers.service";

describe("DriversController", () => {
  let driversController: DriversController;
  let driversService: DriversService;

  beforeEach(async () => {
    const driversModule: TestingModule = await Test.createTestingModule({
      imports: [ SplytApiModule ],
      controllers: [ DriversController ],
      providers: [ DriversService ]
    }).compile();

    driversController = driversModule.get<DriversController>(DriversController);
    driversService = driversModule.get<DriversService>(DriversService);
  });

  describe("GET /", () => {
    it("should return \"OK\"", () => {
      jest.spyOn(driversService, "findAll").mockImplementation(async () => findAlldriversFixture.expect.withoutNumberOfVehicles);
      expect(driversController.findAll(findAlldriversFixture.valid.required)).resolves.toEqual(findAlldriversFixture.expect.withoutNumberOfVehicles);
    });
  });
});
