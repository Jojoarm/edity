import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { v2 as cloudinary } from 'cloudinary';
import Activity from '../models/Activity';
import { Readable } from 'stream';
import { createError } from '../middlewares/errorHandler';

export const createActivity = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const { title, type, provider, hours, date, status, description } =
      req.body;

    let certificate = '';
    if (req.file) {
      // Convert buffer to readable stream
      const bufferStream = Readable.from(req.file.buffer);

      // Determine resource type based on file mimetype
      const getResourceType = (mimetype: string) => {
        if (mimetype === 'application/pdf') return 'raw';
        if (mimetype.startsWith('image/')) return 'image';
        return 'auto';
      };

      // Wrap Cloudinary upload_stream in a Promise
      const streamUpload = () =>
        new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'activity_certificate',
              resource_type: getResourceType(req.file!.mimetype),
              flags:
                req.file!.mimetype === 'application/pdf'
                  ? 'attachment'
                  : undefined,
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result.secure_url);
            }
          );
          bufferStream.pipe(stream);
        });

      certificate = await streamUpload();
    }

    await Activity.create({
      title,
      type,
      provider,
      hours,
      date,
      status,
      description,
      certificate,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Activity successfully created!',
      certificate,
    });
  }
);

export const fetchActivities = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const activities = await Activity.find();
    if (activities.length === 0) throw createError('No Activity found');
    res.status(200).json({ success: true, data: activities });
  }
);
