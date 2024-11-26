export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  nyc: {
    parkingMetersApiUrl: process.env.NYC_PARKING_METERS_API_URL,
    syncInterval: process.env.SYNC_INTERVAL || '0 0 * * *', // Daily at midnight
  },
});
