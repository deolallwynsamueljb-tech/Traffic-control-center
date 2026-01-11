const mongoose = require('mongoose');

async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri, {
      // useNewUrlParser/useUnifiedTopology removed in mongoose v7
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
