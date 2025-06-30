import express from 'express';
import {
  validateUserLoginRequest,
  validateUserSignUpRequest,
} from '../middlewares/validator';
import {
  completeRegistration,
  getUser,
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signUp,
  userLogout,
  validateToken,
  verifyOtp,
} from '../controller/userController';
import { verifyToken } from '../middlewares/auth';
import upload from '../middlewares/upload';

const userRouter = express.Router();

userRouter.post('/sign-up', validateUserSignUpRequest, signUp);
userRouter.post('/login', validateUserLoginRequest, signIn);
userRouter.post('/google-auth', googleAuth);
userRouter.get('/validate-token', verifyToken, validateToken);
userRouter.post(
  '/complete-registration',
  verifyToken,
  upload.single('profilePicture'),
  completeRegistration
);

userRouter.get('/get-user', verifyToken, getUser);
userRouter.post('/logout', userLogout);
userRouter.post('/send-otp', sendOtp);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
