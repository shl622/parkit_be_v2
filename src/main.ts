import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { DataSource } from 'typeorm';
import { rootRoutes } from './routes/root.routes';
import { parkingMeterRoutes } from './routes/parking-meter.routes';
import { ParkingMeter } from './models/parking-meter.model';

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Register plugins
server.register(cors, {
  origin: true,
});

// Register Swagger
server.register(swagger, {
  openapi: {
    info: {
      title: 'Parkit API',
      description: 'API for managing parking meters',
      version: '1.0.0'
    },
  }
});

// Register Swagger UI
server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Create TypeORM connection
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'parkitv2',
  synchronize: true,
  logging: true,
  entities: [ParkingMeter],
  migrations: ['src/migrations/*.ts'],
});

// Register routes
server.register(rootRoutes);
server.register(parkingMeterRoutes);

const start = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    // Start the server
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server started successfully');
    console.log('API documentation available at: http://localhost:3000/docs');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
