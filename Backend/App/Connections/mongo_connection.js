const mongoose = require("mongoose");

// Ensure you have set these environment variables
const db_connect = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

async function connectToMongoDB() {
  try {
    await mongoose.connect(db_connect, {
      dbName: dbName,
    });
    
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if there's a connection error
  }
}

const connection = mongoose.connection;

connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

// Connect to MongoDB
connectToMongoDB();

// Ensure the connection is open before accessing the database
connection.once('open', () => {
  console.log('Database connection is open');
});
