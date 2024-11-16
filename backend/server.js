import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming requests
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(cookieParser());
// Debugging: Log the MongoDB connection URL (optional, ensure it's safe to log in dev)
console.log("MongoDB URL:", process.env.MONGO_URL);

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  // Establish MongoDB connection after the server starts
  connectMongoDB();
});
