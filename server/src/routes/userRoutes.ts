import express from 'express';
import {
  validateUserLoginRequest,
  validateUserSignUpRequest,
} from '../middlewares/validator';
import {
  completeRegistration,
  getUser,
  googleAuth,
  signIn,
  signUp,
  userLogout,
  validateToken,
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

export default userRouter;
