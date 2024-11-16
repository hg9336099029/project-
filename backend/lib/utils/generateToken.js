import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    // Generate the JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '15d', // Token expiration time
    });

    // Set the cookie with appropriate options
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // Prevents client-side scripts from accessing the cookie
      sameSite: "strict", // Prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    });

    return token; // Return the token if needed elsewhere
  } catch (error) {
    console.error("Error generating token and setting cookie:", error.message);
    throw new Error("Token generation failed");
  }
};
