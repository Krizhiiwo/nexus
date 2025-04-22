import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

// const User = mongoose.model('User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = secretKey === process.env.ADMIN_SECRET_KEY ? 'admin' : 'user';

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

//Login


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.status === 'deleted') {
      return res.status(403).json({ message: 'This account has been deleted. Please contact support.' });
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



// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ message: 'Login successful', role: user.role, token });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ message: 'Login failed', error: error.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

//Delete

router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' }, // assuming your schema has a 'status' field
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User status set to deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user status', error: error.message });
  }
});


// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete user', error: error.message });
//   }
// });


//Update
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


// User stats for chart

// GET /api/users/user-stats
router.get('/user-stats', async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $exists: true }
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          status: "$status"
        }
      },
      {
        $group: {
          _id: "$month",
          registered: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0]
            }
          },
          deleted: {
            $sum: {
              $cond: [{ $eq: ["$status", "deleted"] }, 1, 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ];

    const stats = await User.aggregate(pipeline);

    // Convert month numbers to names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const labels = [];
    const registered = [];
    const deleted = [];

    stats.forEach(stat => {
      labels.push(monthNames[stat._id - 1]);
      registered.push(stat.registered);
      deleted.push(stat.deleted);
    });

    res.json({ months: labels, registered, deleted });
  } catch (err) {
    console.error("User stats error:", err);
    res.status(500).json({ message: "Failed to fetch user stats" });
  }
});



// router.get('/user-stats', async (req, res) => {
//   try {

//     const registered = await User.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

   
//     const deleted = await User.aggregate([
//       { $match: { deleted: true } }, 
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     const monthNames = [
//       "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

    
//     const formatData = (arr) => {
//       const data = new Array(12).fill(0);  
//       arr.forEach(item => {
//         data[item._id - 1] = item.count;  
//       });
//       return data;
//     };

//     res.json({
//       months: monthNames.slice(1),  
//       registered: formatData(registered),
//       deleted: formatData(deleted)
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Error generating stats', error });
//   }
// });

//Total


router.get('/user-total', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); 
    const deletedUsers = await User.countDocuments({ status: 'deleted' }); 
    const adminUsers = await User.countDocuments({ role: 'admin' }); 

    res.json({
      totalUsers,
      deletedUsers,
      adminUsers,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




// router.get('/user-total', async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments(); 
//     const deletedUsers = await User.countDocuments({ isDeleted: true }); 
//     const adminUsers = await User.countDocuments({ role: 'admin' }); 

//     res.json({
//       totalUsers,
//       deletedUsers,
//       adminUsers,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

export default router;