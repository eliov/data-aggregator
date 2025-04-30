import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   await app.listen(3000);

  console.log('REST API running at http://localhost:3000');
}
bootstrap();
