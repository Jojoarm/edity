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

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // connect to third-party services first
    await connectDB();
    connectCloudinary();

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
      res.send('API working');
    });

    // routes
    app.use('/api/users', userRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/educators', educatorRouter);
    app.use('/api/activity', activityRouter);

    // error handler
    app.use(errorHandler);

    app.listen(port, () => {
      console.log('🚀 Server running on port', port);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1); // Exit process if DB fails to connect
  }
};

startServer();
