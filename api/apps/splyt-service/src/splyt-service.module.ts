import { Module } from "@nestjs/common";

import { SplytServiceController } from "./splyt-service.controller";
import { SplytServiceService } from "./splyt-service.service";

@Module({
  imports: [],
  controllers: [ SplytServiceController ],
  providers: [ SplytServiceService ]
})
export class SplytServiceModule {}
