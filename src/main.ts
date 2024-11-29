import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { dataSource } from './config/database';
import { rootRoutes } from './routes/root.routes';

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

server.decorate('dataSource', dataSource);

// Register Swagger UI
server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Register routes
server.register(rootRoutes);

const start = async () => {
  try {
    // Initialize database connection
    await dataSource.initialize();
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
