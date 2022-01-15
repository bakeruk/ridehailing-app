import { Module } from "@nestjs/common";

import { SplytApiModule } from "../common/providers/splyt-api";
import { DriversController } from "./drivers.controller";
import { DriversService } from "./drivers.service";

/**
 * Drivers module
 */
@Module({
  imports: [ SplytApiModule ],
  controllers: [ DriversController ],
  providers: [ DriversService ]
})
export class DriversModule {}
