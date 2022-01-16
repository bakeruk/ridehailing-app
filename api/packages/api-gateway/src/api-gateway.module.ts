import { Module } from "@nestjs/common";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { TaxisNearbyModule } from "./taxis-nearby/taxis-nearby.module";

/**
 * Api gateway module
 */
@Module({
  imports: [ TaxisNearbyModule ],
  controllers: [ ApiGatewayController ],
  providers: [ ApiGatewayService ]
})
export class ApiGatewayModule {}
