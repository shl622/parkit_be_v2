import { DataSource } from 'typeorm';
import { ParkingMeter } from '../models/parking-meter.model';

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'parkit',
    entities: [ParkingMeter],
    synchronize: process.env.NODE_ENV !== 'production',
});