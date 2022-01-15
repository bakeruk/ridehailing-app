import { Controller, Get } from "@nestjs/common";

import { SplytServiceService } from "./splyt-service.service";

@Controller()
export class SplytServiceController {
  constructor(private readonly splytServiceService: SplytServiceService) {}

  @Get()
  getHello(): string {
    return this.splytServiceService.getHello();
  }
}
