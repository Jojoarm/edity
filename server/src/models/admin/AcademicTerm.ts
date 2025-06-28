import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicTerm extends Document {
  name: 'First Term' | 'Second Term' | 'Third Term';
  startDate: Date;
  endDate: Date;
  academicYear: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const academicTermSchema = new Schema<IAcademicTerm>(
  {
    name: {
      type: String,
      enum: ['First Term', 'Second Term', 'Third Term'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAcademicTerm>(
  'AcademicTerm',
  academicTermSchema
);
