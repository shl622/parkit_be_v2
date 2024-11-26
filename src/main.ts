// src/main.ts
import { NestFactory } from '@nestjs/core';
import { 
  FastifyAdapter, 
  NestFastifyApplication 
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import compression from '@fastify/compress';

async function bootstrap() {
  // Create Fastify adapter instance
  const fastifyAdapter = new FastifyAdapter();
  
  // Register compression with the adapter
  await fastifyAdapter.register(compression, { 
    encodings: ['gzip', 'deflate']
  });

  // Create NestJS app with the configured adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );

  // Get config service
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Enable CORS if needed
  app.enableCors();

  // Start server
  const port = configService.get<number>('port', 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();