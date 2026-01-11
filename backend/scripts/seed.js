require('dotenv').config();
const connectDB = require('../src/config/db');
const { seedAll } = require('../src/utils/seedData');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/traffic_control';

(async () => {
  try {
    await connectDB(mongoUri);
    await seedAll();
    console.log('Seed script finished.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
})();
