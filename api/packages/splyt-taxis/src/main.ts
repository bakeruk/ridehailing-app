import compression from "compression";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import helmet from "helmet";

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
  // Performance
  splytTaxis.use(compression());
  // Security
  splytTaxis.enableCors();
  splytTaxis.use(helmet());
  await splytTaxis.listen(port);
  logger.log(`Splyt taxis microservice listening on port: ${port}`);
};

bootstrap();