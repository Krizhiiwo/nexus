import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('_id name email role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// User stats for chart
router.get('/user-stats', async (req, res) => {
  try {
    // Fetch registered users aggregated by month
    const registered = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }  // Sort by month
    ]);

    // Fetch deleted users (assuming you have a 'deleted' field)
    const deleted = await User.aggregate([
      { $match: { deleted: true } }, // Ensure that we're only counting deleted users
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Array to map month numbers to month names
    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    
    const formatData = (arr) => {
      const data = new Array(12).fill(0);  // Create an array of 12 months, initialized to 0
      arr.forEach(item => {
        data[item._id - 1] = item.count;  // Fill the correct month index with count
      });
      return data;
    };

    // Send the response with months, registered, and deleted user data
    res.json({
      months: monthNames.slice(1),  // Remove the empty first element
      registered: formatData(registered),
      deleted: formatData(deleted)
    });

  } catch (error) {
    res.status(500).json({ message: 'Error generating stats', error });
  }
});




// import express from 'express';
// import bcrypt from 'bcryptjs';
// import User from '../models/User.js'; 

// const router = express.Router();


// //Register
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// //Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     res.json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// //Update
// router.put('/update/:id', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.findByIdAndUpdate(req.params.id, { name, email, password: hashedPassword }, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User updated successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// //Delete
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().select('_id name email role');
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
// });

// export default router;
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
//       { $match: { deleted: true } }, // only if you're marking deleted users
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     const monthNames = [
//       "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     const formatData = (arr) => {
//       const data = new Array(12).fill(0);
//       arr.forEach(item => {
//         data[item._id - 1] = item.count;
//       });
//       return data;
//     };

//     res.json({
//       months: monthNames.slice(1), // Jan to Dec
//       registered: formatData(registered),
//       deleted: formatData(deleted)
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating stats', error });
//   }
// });