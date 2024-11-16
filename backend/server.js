import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
const app = express();

console.log(process.env.MONGO_URL);

app.use(express.json());// to parse req.body

// Use the auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse request body

app.use(express.urlencoded({extended: true})); 
// Start the server and connect to MongoDB
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    // Establish MongoDB connection after the server starts
    connectMongoDB();
});
