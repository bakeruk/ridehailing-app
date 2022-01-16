import compression from "compression";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { SplytTaxisModule } from "./splyt-taxis.module";

/**
 * Bootstrap
 */
const bootstrap = async () => {
  const splytTaxis = await NestFactory.create(SplytTaxisModule);

  // Enabled global validation on requests with argument decorators
  splytTaxis.useGlobalPipes(
    new ValidationPipe({ transform: true }),
  );
  splytTaxis.enableCors();
  splytTaxis.use(compression());
  await splytTaxis.listen(4010);
};

bootstrap();