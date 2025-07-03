// models/educator/LessonPlan.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILessonPlan extends Document {
  subject: string;
  topic: string;
  classLevel: string;
  duration: string;
  learningObjective: string;

  markdownContent: string; // full AI-generated markdown
  isEdited: boolean;
  lastEditedBy?: mongoose.Types.ObjectId;
  educator: mongoose.Types.ObjectId;
  modelUsed: string;

  createdAt: Date;
  updatedAt: Date;
}

const LessonPlanSchema: Schema = new Schema<ILessonPlan>(
  {
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    classLevel: { type: String, required: true },
    duration: { type: String, default: '50 minutes' },
    learningObjective: { type: String, required: true },

    markdownContent: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modelUsed: { type: String, default: 'Gemini Pro' },
  },
  { timestamps: true }
);

export default mongoose.model<ILessonPlan>('LessonPlan', LessonPlanSchema);
