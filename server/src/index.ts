import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig';
import userRouter from './routes/userRoutes';
import connectCloudinary from './config/cloudinary';

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

app.listen(port, () => {
  console.log('Server running on localhost:', port);
});
