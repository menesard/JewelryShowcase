// kuyum-vitrin/backend/controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// This is a temporary in-memory store for users, replacing a real database for now.
const users = [];
const JWT_SECRET = 'your_super_secret_key_that_should_be_in_env_vars'; // Use environment variables in production

/**
 * Handles new user registration.
 */
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  // Hash the password for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user object (in-memory)
  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    password: hashedPassword,
    role: 'B2C_CUSTOMER'
  };

  users.push(newUser);
  console.log('New user registered:', newUser);

  // Respond with success (but don't send the password back)
  res.status(201).json({
    message: 'User registered successfully!',
    user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email }
  });
};

/**
 * Handles user login.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  // Find the user
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // User is authenticated, create a JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  // Send the token back to the client
  res.status(200).json({
    message: 'Login successful!',
    token,
    user: { id: user.id, fullName: user.fullName, email: user.email }
  });
};

module.exports = {
  register,
  login
};
