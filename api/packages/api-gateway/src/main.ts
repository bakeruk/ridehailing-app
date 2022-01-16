import compression from "compression";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { ApiGatewayModule } from "./api-gateway.module";

/**
 * Bootstrap
 */
const bootstrap = async () => {
  const apiGateway = await NestFactory.create(ApiGatewayModule);

  // Enabled global validation on requests with argument decorators
  apiGateway.useGlobalPipes(
    new ValidationPipe({ transform: true }),
  );
  apiGateway.enableCors();
  apiGateway.use(compression());
  await apiGateway.listen(4000);
};

bootstrap();
