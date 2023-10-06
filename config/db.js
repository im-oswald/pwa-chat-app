const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected');
  } catch(err) {
    console.log(err.message);
    // Exit process on error
    process.exit(1);
  }
}

module.exports = connectDB;
