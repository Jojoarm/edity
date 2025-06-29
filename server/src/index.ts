import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig';
import userRouter from './routes/userRoutes';
import connectCloudinary from './config/cloudinary';
import adminRouter from './routes/adminRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { seedSubjects } from './seeds/SubjectSeeder';

const port = process.env.PORT || 5000;

//connect cloudinary
connectCloudinary();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Api working');
});

// seedSubjects();

//routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on localhost:', port);
});
