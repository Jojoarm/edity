import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig';
import userRouter from './routes/userRoutes';
import connectCloudinary from './config/cloudinary';
import adminRouter from './routes/adminRoutes';
import { errorHandler } from './middlewares/errorHandler';
import educatorRouter from './routes/educatorRoutes';
import activityRouter from './routes/activityRoutes';
import { seedEducatorActivities } from './seeds/ActivitySeeder';

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

//routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/educators', educatorRouter);
app.use('/api/activity', activityRouter);

// seedEducatorActivities();

//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on localhost:', port);
});
