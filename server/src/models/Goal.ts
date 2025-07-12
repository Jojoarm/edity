import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description: string;
  type: string;
  current: number;
  target: number;
  deadline: Date;
  status: string;
  priority: string;
  category: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema<IGoal>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    current: { type: Number, required: true },
    target: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    category: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>('Goal', GoalSchema);
