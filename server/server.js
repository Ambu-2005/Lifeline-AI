const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
  console.log("MONGO_URI starts with:", process.env.MONGO_URI?.substring(0, 15));

  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifelineai'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;