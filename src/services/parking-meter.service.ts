import { Repository } from 'typeorm';
import { AppDataSource } from '../main';
import { ParkingMeter } from '../models/parking-meter.model';

export class ParkingMeterService {
  private repository: Repository<ParkingMeter>;

  constructor() {
    this.repository = AppDataSource.getRepository(ParkingMeter);
  }

  async findAll(): Promise<ParkingMeter[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<ParkingMeter | null> {
    return this.repository.findOneBy({ id });
  }

  async create(data: Partial<ParkingMeter>): Promise<ParkingMeter> {
    const parkingMeter = this.repository.create(data);
    return this.repository.save(parkingMeter);
  }

  async update(id: string, data: Partial<ParkingMeter>): Promise<ParkingMeter | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
