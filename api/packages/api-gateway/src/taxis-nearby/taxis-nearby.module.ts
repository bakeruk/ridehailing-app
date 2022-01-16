import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { TaxisNearbyController } from "./taxis-nearby.controller";
import { TaxisNearbyService } from "./taxis-nearby.service";

@Module({
  imports: [ HttpModule ],
  controllers: [ TaxisNearbyController ],
  providers: [ TaxisNearbyService ]
})
export class TaxisNearbyModule {}
