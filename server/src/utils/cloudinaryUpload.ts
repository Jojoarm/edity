import { Readable } from 'stream';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryUploadOptions {
  buffer: Buffer;
  originalname: string;
  folder: string;
  transformations?: any[];
}

export const uploadToCloudinary = async ({
  buffer,
  originalname,
  folder,
  transformations,
}: CloudinaryUploadOptions): Promise<string> => {
  const bufferStream = Readable.from(buffer);

  const fileExt = path.extname(originalname).toLowerCase();
  const fileName = path.basename(originalname, fileExt);

  const validImageExts = ['.jpg', '.jpeg', '.png', '.webp'];
  if (!validImageExts.includes(fileExt)) {
    throw new Error('Only image uploads are supported (jpg, jpeg, png, webp)');
  }

  const streamUpload = () =>
    new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          use_filename: true,
          unique_filename: false,
          public_id: fileName,
          transformation: transformations,
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        }
      );

      bufferStream.pipe(stream);
    });

  return await streamUpload();
};
