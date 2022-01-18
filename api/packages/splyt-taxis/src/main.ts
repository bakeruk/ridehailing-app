import compression from "compression";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import { SplytTaxisModule } from "./splyt-taxis.module";

/**
 * Bootstrap
 */
const bootstrap = async () => {
  const env = process.env.ENVIRONMENT;
  const port = process.env.SPLYT_TAXIS_MICROSERVICE_PORT;

  const splytTaxis = await NestFactory.create(SplytTaxisModule, {
    logger: env === "production" ? [ "error", "warn" ] : [
      "error",
      "warn",
      "debug",
      "log"
    ]
  });

  const logger = new Logger("server");

  // Enabled global validation on requests with argument decorators
  splytTaxis.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );
  splytTaxis.enableCors();
  splytTaxis.use(compression());
  await splytTaxis.listen(port);
  logger.log(`Splyt taxis microservice listening on port: ${port}`);
};

bootstrap();