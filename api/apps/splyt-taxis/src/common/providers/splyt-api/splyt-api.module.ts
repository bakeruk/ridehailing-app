import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { SplytApiService } from "./splyt-api.service";

/**
 * Splyt api module
 */
@Module({
  imports: [ HttpModule ],
  providers: [ SplytApiService ],
  exports: [ SplytApiService ]
})
export class SplytApiModule {}
