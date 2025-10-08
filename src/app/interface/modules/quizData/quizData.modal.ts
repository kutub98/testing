import mongoose, { Schema } from 'mongoose';
import type { IQuizData } from './quizData.interface';

const QuizDataSchema: Schema<IQuizData> = new mongoose.Schema(
  {
    quizInfo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    competitionDetails: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
    },
    rules: {
      title: { type: String, required: true },
      items: [{ type: String, required: true }],
    },
  },
  {
    timestamps: true,
  },
);

export const QuizDataModel = mongoose.model<IQuizData>('quizData', QuizDataSchema);
