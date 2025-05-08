import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import AuthRoutes from './Routes/AuthRoutes.js';
import QueryRoutes from './Routes/QueryRoutes.js';
import MetricRoutes from './Routes/MetricRoutes.js'; // ✅ import

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express(); // ✅ make sure this is BEFORE any app.use
app.use(express.json());
app.use(cors());

const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI. Please check your .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// ✅ These should all come AFTER app is initialized
app.use('/api/users', AuthRoutes);
app.use('/api', QueryRoutes);
app.use('/api', MetricRoutes); // ✅ this line is now valid

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on :${PORT}`);
});




// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path'; 
// import AuthRoutes from './Routes/AuthRoutes.js';
// import QueryRoutes from './Routes/QueryRoutes.js';
// // import MonitorRoutes from './Routes/MonitorRoutes.js';


// dotenv.config({ path: path.resolve(process.cwd(), '.env') });


// const app = express();
// app.use(express.json());
// app.use(cors());

// const { MONGO_URI } = process.env;
// if (!MONGO_URI) {
//   console.error("Missing MONGO_URI. Please check your .env file.");
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   });

// app.use('/api/users', AuthRoutes);
// app.use('/api', QueryRoutes);
// // app.use('/api/monitor', MonitorRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on :${PORT}`);
// });
