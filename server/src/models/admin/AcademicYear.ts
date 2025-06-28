import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicYear extends Document {
  name: string; // e.g., "2024/2025"
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const academicYearSchema = new Schema<IAcademicYear>(
  {
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isCurrent: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAcademicYear>(
  'AcademicYear',
  academicYearSchema
);
