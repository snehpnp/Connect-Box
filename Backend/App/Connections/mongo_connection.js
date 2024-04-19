const mongoose = require("mongoose");


if (!process.env.MONGO_URI || !process.env.DB_NAME) {
  console.error("Please set MONGO_URI and DB_NAME environment variables.");
  process.exit(1); // Exit with error status code
}

const db_connect = process.env.MONGO_URI;

mongoose.connect(db_connect, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  dbName: process.env.DB_NAME,
});

const connection = mongoose.connection;

connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

connection.once("open", () => {
  console.log("Connected to MongoDB");
});
