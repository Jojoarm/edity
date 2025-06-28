import mongoose, { Schema, Document } from 'mongoose';

export interface IClassLevel extends Document {
  name: string; // e.g., "JSS1", "SS2", "Grade 6"
  description?: string;
  createdBy: mongoose.Types.ObjectId;
}

const classLevelSchema = new Schema<IClassLevel>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IClassLevel>('ClassLevel', classLevelSchema);
