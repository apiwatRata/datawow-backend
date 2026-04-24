import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN?.split(',') || ['http://localhost:4200'] ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           
    forbidNonWhitelisted: true, 
    transform: true,            
  }));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
