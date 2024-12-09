import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    // Verify JWT Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError.message);
      return res.status(401).json({ error: "Unauthorized: Invalid or Expired Token" });
    }

    // Fetch user from the database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    next();
  } catch (err) {
    console.error("Error in protectRoute middleware:", err.message);

    // Handle specific errors (e.g., ECONNRESET)
    if (err.code === "ECONNRESET") {
      return res.status(503).json({ error: "Service Unavailable. Please try again later." });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
