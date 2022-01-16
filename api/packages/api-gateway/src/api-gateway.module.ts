import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
// import { TaxisNearbyController } from "./taxis-nearby/taxis-nearby.controller";
import { TaxisNearbyModule } from "./taxis-nearby/taxis-nearby.module";
// import { TaxisNearbyService } from "./taxis-nearby/taxis-nearby.service";

/**
 * Api gateway module
 */
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), TaxisNearbyModule ],
  controllers: [ ApiGatewayController ],
  providers: [ ApiGatewayService ]
})
export class ApiGatewayModule {}
