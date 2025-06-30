import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  subject: mongoose.Types.ObjectId;
  educator: mongoose.Types.ObjectId[];
  classLevel: mongoose.Types.ObjectId;
  academicYear: mongoose.Types.ObjectId;
  academicTerm: mongoose.Types.ObjectId;
  resources: string[]; // e.g., links or file paths
  createdBy: mongoose.Types.ObjectId;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    educator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    classLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassLevel',
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
    academicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicTerm',
      required: true,
    },
    resources: [{ type: String }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ academicTerm: 1 });
courseSchema.index({ academicYear: 1 });
courseSchema.index({ classLevel: 1 });
courseSchema.index({ educator: 1 });
courseSchema.index({ title: 1 });

export default mongoose.model<ICourse>('Course', courseSchema);
