import { Request, Response } from 'express';
import { createError } from '../middlewares/errorHandler';
import User from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import RoleRequest from '../models/RoleRequest';

declare interface GooglePayload {
  email: string;
  name: string;
  sub: string;
  picture: string;
}

// user signup
export const signUp = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = true;

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    //   await sendWelcomeEmail(newUser);

    //generate tokens
    const token = jwt.sign(
      { userId: user._id, role: user.status },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '7d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 86400000,
    });

    res.status(201).json({
      success: true,
      token: token,
      message: 'User created successfully',
      newUser,
    });
  }
);

//user signin
export const signIn = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        "You don't have an account with us, sign up to get started"
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw createError('Invalid Credentials');

    //generate tokens
    const token = jwt.sign(
      { userId: user._id, role: user.status },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '7d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 86400000,
    });
    res.status(201).json({
      success: true,
      token: token,
      message: 'Login Successful',
      userId: user._id,
    });
  }
);

//Google login/signup
export const googleAuth = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw createError('Invalid token payload', 400);
    }

    const { email, name, sub, picture } = payload as GooglePayload;

    let user = await User.findOne({ email });
    let newUser = false;

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: sub,
        profilePicture: picture,
      });
      newUser = true;
    }

    //generate tokens
    const token = jwt.sign(
      { userId: user._id, role: user.status },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '7d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 86400000,
    });

    res.status(201).json({
      success: true,
      token: token,
      message: newUser ? 'Account created successfully' : 'Login successful',
      newUser,
    });
  }
);

//validate token
export const validateToken = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    res.status(200).send({ userId: req.userId });
  }
);

//complete registration
export const completeRegistration = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const {
      role,
      dob,
      gender,
      tel,
      address,
      sponsorsName,
      sponsorsEmail,
      sponsorsTel,
    } = req.body;

    // check if user already submitted a request
    const existingRequest = await User.findOne({ userId, isSubmitted: true });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending role request',
      });
    }

    //send the request
    const roleRequest = new RoleRequest({ user: userId, requestedRole: role });
    await roleRequest.save();

    //update user
    let profilePictureUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures',
        transformation: [
          { width: 300, height: 300, crop: 'fill' },
          { quality: 'auto' },
        ],
      });
      profilePictureUrl = result.secure_url;
    }

    await User.findByIdAndUpdate(userId, {
      role,
      profilePicture: profilePictureUrl,
      dob,
      gender,
      tel,
      address,
      isSubmitted: true,
    });

    if (role === 'student' && sponsorsName && sponsorsEmail && sponsorsTel) {
      await User.findByIdAndUpdate(userId, {
        sponsorsContact: {
          name: sponsorsName,
          email: sponsorsEmail,
          phone: sponsorsTel,
        },
      });
    }

    res.status(201).json({
      success: true,
      message:
        "Role request submitted successfully. You will be notified once it's reviewed.",
    });
  }
);

//get role request status
export const getRoleRequestStatus = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;

    const roleRequest = await RoleRequest.findOne({ userId })
      .sort({ submittedAt: -1 })
      .populate('reviewedBy', 'name email');

    if (!roleRequest) {
      return res.status(404).json({
        success: false,
        message: 'No role request found',
      });
    }

    res.status(200).json({
      success: true,
      data: roleRequest,
    });
  }
);

//user logout
export const userLogout = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    res.cookie('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date(0),
      path: '/',
    });
    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date(0),
      path: '/',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
);

//fetch user
export const getUser = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId).lean().select('-password');
    if (!user) throw createError('User not found');
    res.status(201).json({ success: true, userData: user });
  }
);

export const refreshAccessToken = catchAsync(async (req, res) => {
  const token = req.cookies['refresh_token'];
  if (!token) throw createError('No refresh token provided', 401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '15m' }
    );

    res.cookie('auth_token', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    throw createError('Invalid refresh token', 403);
  }
});
