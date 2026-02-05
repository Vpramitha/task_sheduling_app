const mongoose = require('mongoose');
require('dotenv').config();

const dns = require("dns");


const connectDB = async () => {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;