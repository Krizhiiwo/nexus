import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

// const User = mongoose.model('User');

router.post('/register', async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = secretKey === process.env.ADMIN_SECRET_KEY ? 'admin' : 'user';

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', role: user.role, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, password: hashedPassword, role },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

router.get('/user-stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // all users
    const deletedUsers = await User.countDocuments({ isDeleted: true }); // assuming soft delete using a flag
    const adminUsers = await User.countDocuments({ role: 'admin' }); // assuming role is defined

    res.json({
      totalUsers,
      deletedUsers,
      adminUsers,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;