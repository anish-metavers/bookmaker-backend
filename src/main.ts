import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AerospikeConnect from 'model/aerospike/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3200);
  // await AerospikeConnect()
}
bootstrap();
