import { Schema, model } from 'mongoose';
import type { IQuestion } from './questions.interface';


const QuestionSchema = new Schema<IQuestion>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['mcq', 'short', 'written'],
      required: true,
    },
    options: { type: [String], default: [] },
    answer: { type: String, required: true },
    marks: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Question = model<IQuestion>('Question', QuestionSchema);
