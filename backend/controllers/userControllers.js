// backend/controllers/userController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      message: 'User created',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Return only selected fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = { loginUser, signupUser, getAllUsers };
