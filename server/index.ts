import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/auth';


declare module 'express-serve-static-core'{
  interface Request{
    user? : string;
  }
}

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON
app.use('/api/tasks', taskRoutes); // route handler
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
.catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('MongoDB connection failed:', err.message);
    } else {
      console.error('MongoDB connection failed:', err);
    }
  });
