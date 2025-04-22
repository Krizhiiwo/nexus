import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './server/Routes/AuthRoutes.js';
import QueryRoutes from './server/Routes/QueryRoutes.js';

dotenv.config();

const app = express();
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

app.use('/api/users', AuthRoutes);
app.use('/api', QueryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import AuthRoutes from './server/Routes/AuthRoutes.js';
// import QueryRoutes from './server/Routes/QueryRoutes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const { MONGO_URI } = process.env;
// if (!MONGO_URI) {
//   console.error("Missing MONGO_URI. Please check your .env file.");
//   process.exit(1);
// }

// // MongoDB connection
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   });

// // Routes
// app.use('/api/users', AuthRoutes);
// app.use('/api', QueryRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });