import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ParkingMetersModule } from './parking-meters/parking-meters.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('nodeEnv') === 'development', // Set to true only in development
        logging: configService.get('nodeEnv') === 'development',
        ssl: configService.get('nodeEnv') === 'production',
      }),
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    ParkingMetersModule,
    SyncModule,
  ],
})
export class AppModule {}