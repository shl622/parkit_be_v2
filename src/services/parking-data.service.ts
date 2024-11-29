import { Repository } from "typeorm"
import axios from "axios"
import { ParkingMeter } from "src/models/parking-meter.model"

export class ParkingDataService {
    private readonly baseUrl = process.env.NYC_PARKING_METERS_API_URL;
    private readonly batchSize = 1000;

    constructor(private readonly repository: Repository<ParkingMeter>) { }

    async fetchAllData(): Promise<any[]> {
        let offset = 0;
        let allData: any[] = [];
        let hasMore = true;

        while (hasMore) {
            try {
                const url = `${this.baseUrl}?$limit=${this.batchSize}&$offset=${offset}`;
                const response = await axios.get(url);
                const data = response.data;
                if (data.length === 0) {
                    hasMore = false;
                } else {
                    allData = allData.concat(data);
                    offset += this.batchSize;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        return allData;
    }
}