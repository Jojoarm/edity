import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  provider: string;
  hours: string;
  date: Date;
  status: string;
  description?: string;
  certificate: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    hours: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    description: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    certificate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
