const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

// ---------------------- SIGNUP ----------------------
const signupUser = async (req, res) => {
  console.log("📦 Received from frontend:", req.body);

  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    // Create token
    const token = createToken(user._id);

    res.status(201).json({
      message: 'User created',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ---------------------- LOGIN ----------------------
const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

// ---------------------- GET ALL USERS ----------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Return only name and email
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
};
