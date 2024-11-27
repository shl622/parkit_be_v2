import fastify from 'fastify';
import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { DataSource } from 'typeorm';

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Register plugins
server.register(cors, {
  origin: true,
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
  entities: ['src/models/*.ts'],
  migrations: ['src/migrations/*.ts'],
});

const start = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    // Start the server
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server started successfully');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
