import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { SplytTaxisController } from "./splyt-taxis.controller";
import { SplytTaxisService } from "./splyt-taxis.service";
import { DriversModule } from "./drivers/drivers.module";

/**
 * Splyt taxis module
 */
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), DriversModule ],
  controllers: [ SplytTaxisController ],
  providers: [ SplytTaxisService ]
})
export class SplytTaxisModule {}
