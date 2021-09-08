const mongoose = require("mongoose");
// const db = require("../middleware/keys").mongoURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
