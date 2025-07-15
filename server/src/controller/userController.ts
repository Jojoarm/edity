import { Request, Response } from 'express';
import { createError } from '../middlewares/errorHandler';
import User from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import RoleRequest from '../models/RoleRequest';
import fs from 'fs';
import {
  deleteOtp,
  generateOtp,
  saveOtp,
  validateOtp,
} from '../middlewares/otp';
import {
  sendOtpEmail,
  sendPasswordResetSuccessful,
} from '../middlewares/email';
import { generatePdfFromHtml } from '../utils/pdfGenerator';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { extractPublicId } from '../utils/utils';

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

    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('Request Origin:', req.headers.origin);
    console.log('Cookie settings:', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    const { role, dob, gender, tel, address } = req.body;

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
      profilePictureUrl = await uploadToCloudinary({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        folder: 'profile_pictures',
        transformations: [
          { width: 300, height: 300, crop: 'fill' },
          { quality: 'auto' },
        ],
      });
    }
    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: 'profile_pictures',
    //     transformation: [
    //       { width: 300, height: 300, crop: 'fill' },
    //       { quality: 'auto' },
    //     ],
    //   });
    //   profilePictureUrl = result.secure_url;
    // }

    await User.findByIdAndUpdate(userId, {
      role,
      profilePicture: profilePictureUrl,
      dob,
      gender,
      tel,
      address,
      isSubmitted: true,
    });

    res.status(201).json({
      success: true,
      message:
        "Role request submitted successfully. You will be notified once it's reviewed.",
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw createError('User not found', 404);

    const updateData: Record<string, any> = {};
    const fieldMappings: Record<string, string> = {
      // Top-level fields
      name: 'name',
      gender: 'gender',
      tel: 'tel',
      address: 'address',
      dob: 'dob',

      // Educator fields
      subject: 'educatorData.subjects',
      classLevel: 'educatorData.classLevel',
      academicYear: 'educatorData.academicYear',
      academicTerm: 'educatorData.academicTerm',
    };

    //Process fields based on mapping
    Object.keys(req.body).forEach((field) => {
      if (fieldMappings[field] && req.body[field] !== undefined) {
        const targetField = fieldMappings[field];

        // Handle array fields (like subjects)
        if (field === 'subject') {
          const subjects =
            typeof req.body[field] === 'string'
              ? req.body[field]
                  .split(',')
                  .map((s: string) => s.trim())
                  .filter((s: string) => s)
              : req.body[field];
          updateData[targetField] = subjects;
        } else {
          updateData[targetField] = req.body[field];
        }
      }
    });

    //Handle profile picture
    if (req.file) {
      // Delete the old one
      if (user.profilePicture) {
        const publicId = extractPublicId(user.profilePicture);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // Upload the new image
      const profilePicture = await uploadToCloudinary({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        folder: 'profile_pictures',
      });

      updateData.profilePicture = profilePicture;
    }

    //Update user with all new data
    await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'User Profile Successfully Updated!',
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

export const sendOtp = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;
    if (!email) throw createError('Valid email is required', 400);

    const user = await User.findOne({ email });
    if (!user) throw createError('Email not registered', 400);

    if (user.googleId)
      throw createError(
        "Users registered through google don't require password",
        400
      );

    const otp = generateOtp();
    await saveOtp(email, otp);
    await sendOtpEmail(user, otp);

    res.json({ success: true, message: 'OTP sent to email' });
  }
);

export const verifyOtp = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, code } = req.body;
    const isValid = await validateOtp(email, code);
    if (!isValid) throw createError('Invalid or expired OTP', 400);

    await deleteOtp(email); // Cleanup after verification

    res.json({ success: true, message: 'OTP verified successfully' });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError('User not found', 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    await user.save();

    await sendPasswordResetSuccessful(user);

    res
      .status(200)
      .json({ success: true, message: 'Password updated successfully' });
  }
);

export const generatePdf = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { htmlContent, filename } = req.body;

    if (!htmlContent || typeof htmlContent !== 'string')
      throw createError('HTML content is required.', 400);

    const safeFilename =
      filename && typeof filename === 'string'
        ? filename.replace(/[^a-z0-9_\-\.]/gi, '_') // prevent unsafe characters
        : 'edity.pdf';

    const pdfBuffer = await generatePdfFromHtml(htmlContent, safeFilename);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
    });

    res.send(pdfBuffer);
  }
);
