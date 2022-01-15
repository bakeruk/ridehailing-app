import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { SplytApiModule } from "./common/providers/splyt-api/splyt-api.module";
import { SplytTaxisController } from "./splyt-taxis.controller";
import { SplytTaxisService } from "./splyt-taxis.service";
import { DriversController } from "./drivers/drivers.controller";
import { DriversModule } from "./drivers/drivers.module";
import { DriversService } from "./drivers/drivers.service";

/**
 * Splyt taxis module
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DriversModule,
    SplytApiModule
  ],
  controllers: [ SplytTaxisController, DriversController ],
  providers: [ SplytTaxisService, DriversService ]
})
export class SplytTaxisModule {}
