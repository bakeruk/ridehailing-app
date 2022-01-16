import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { TaxisNearbyModule } from "./taxis-nearby/taxis-nearby.module";

/**
 * Api gateway module
 */
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), TaxisNearbyModule ],
  controllers: [ ApiGatewayController ],
  providers: [ ApiGatewayService ]
})
export class ApiGatewayModule {}
