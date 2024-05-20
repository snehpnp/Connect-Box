const mongoose = require("mongoose");

if (!process.env.MONGO_URI || !process.env.DB_NAME) {
  console.error("Please set MONGO_URI and DB_NAME environment variables.");
  process.exit(1); // Exit with error status code
}

const db_connect = process.env.MONGO_URI;

async function connectToMongoDB() {
  try {
    await mongoose.connect(db_connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit with error status code
  }
}

const connection = mongoose.connection;

connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

// Call the connection function
connectToMongoDB();

// Optional: Handle graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  } catch (error) {
    console.error("Error during MongoDB connection close:", error);
    process.exit(1); // Exit with error status code
  }
});
