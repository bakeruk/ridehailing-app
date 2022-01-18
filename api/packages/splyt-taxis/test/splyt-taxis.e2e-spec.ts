import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { SplytTaxisModule } from "../src/splyt-taxis.module";

describe("SplytTaxisController (e2e)", () => {
  let splytTaxis: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [ SplytTaxisModule ] }).compile();

    splytTaxis = moduleFixture.createNestApplication();
    await splytTaxis.init();
  });

  it("GET /", () => {
    return request(splytTaxis.getHttpServer())
      .get("/")
      .expect(200)
      .expect("OK");
  });
});
