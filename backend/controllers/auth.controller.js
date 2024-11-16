import User from '../models/User.model.js';
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
       return res.status(400).json({ error: "Invalid email format" });
     }


    // Check for existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check for existing email
    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // Save user and generate token
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });

  } catch (error) {
    console.error("Signup error:", error.message); // Log detailed error for debugging
    res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
};

export const login = async (req, res) => {
  res.json({
    data: "You hit the login endpoint",
  });
};

export const logout = async (req, res) => {
  res.json({
    data: "You hit the logout endpoint",
  });
};