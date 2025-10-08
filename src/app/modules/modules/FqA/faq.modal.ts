// faq.model.ts
import mongoose, { Schema } from 'mongoose';
import { IFaQ } from './faq.interface';

const SingleFaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }, 
);

const FaQSchema = new Schema<IFaQ>({
  faq: {
    type: [SingleFaqSchema], 
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'delete', 'pending'],
    default: 'pending',
  },
});

export const FaQ = mongoose.model<IFaQ>('FaQ', FaQSchema);
