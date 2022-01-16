import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";

import { ApiGatewayModule } from "../src/api-gateway.module";

describe("ApiGatewayController (e2e)", () => {
  let apiGateway: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [ ApiGatewayModule ] }).compile();

    apiGateway = moduleFixture.createNestApplication();
    await apiGateway.init();
  });

  it("GET /", () => {
    return request(apiGateway.getHttpServer())
      .get("/")
      .expect(200)
      .expect("OK");
  });
});
