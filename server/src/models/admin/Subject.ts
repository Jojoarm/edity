// models/Subject.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
}

const subjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Admin who created the subject
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
export default Subject;
