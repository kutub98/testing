import mongoose, { Schema } from 'mongoose';
import { IJudge } from './judge.interface';



const JudgeMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }, // prevents Mongoose from adding _id to each member
);
const QuizDataSchema: Schema<IJudge> = new mongoose.Schema(
  {
    panel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: {
      type: [JudgeMemberSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const JudgeModel = mongoose.model<IJudge>('Judge', QuizDataSchema);
