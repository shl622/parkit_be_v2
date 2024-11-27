import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity('parking_meters')
export class ParkingMeter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  payByCellNumber: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
  })
  location: Point;

  @Column()
  active: boolean;

  @Column()
  hourlyRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
