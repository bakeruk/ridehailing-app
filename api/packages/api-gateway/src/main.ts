import compression from "compression";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import { ApiGatewayModule } from "./api-gateway.module";

/**
 * Bootstrap
 */
const bootstrap = async () => {
  const env = process.env.ENVIRONMENT;
  const port = process.env.API_GATEWAY_PORT;

  const apiGateway = await NestFactory.create(ApiGatewayModule, {
    logger: env === "production" ? [ "error", "warn" ] : [
      "error",
      "warn",
      "debug",
      "log"
    ]
  });

  const logger = new Logger("server");

  // Enabled global validation on requests with argument decorators
  apiGateway.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );
  apiGateway.enableCors();
  apiGateway.use(compression());
  await apiGateway.listen(port);
  logger.log(`API Gateway listening on port: ${port}`);
};

bootstrap();
