import mongoose, { Schema } from 'mongoose';
import type { IQuizTimelineAndInstructionsType } from './timeInstruction.interface';

const sectionSchema = new Schema(
  {
    title: { type: String, required: true },
    points: { type: [String], required: true },
    bgColor: { type: String },
    textColor: { type: String },
  },
  { _id: false },
);

const QuizDataSchema = new Schema<IQuizTimelineAndInstructionsType>(
  {
    timeline: { type: sectionSchema, required: true },
    instructions: { type: sectionSchema, required: true },
  },
  {
    timestamps: true,
  },
);

export const TimeInstructionModal =
  mongoose.model<IQuizTimelineAndInstructionsType>(
    'TimeInstruction',
    QuizDataSchema,
  );
