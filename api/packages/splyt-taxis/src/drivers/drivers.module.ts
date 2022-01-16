import { Module } from "@nestjs/common";

import { DriversController } from "./drivers.controller";
import { DriversService } from "./drivers.service";

/**
 * Drivers module
 */
@Module({
  controllers: [ DriversController ],
  providers: [ DriversService ]
})
export class DriversModule {}
