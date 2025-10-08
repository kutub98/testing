import { Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  event: Types.ObjectId; // Reference to Event
  title: string;
  type: 'mcq' | 'short' | 'written';
  options?: string[]; // For MCQ
  answer: string;
  marks: number;
  createdAt?: Date;
  updatedAt?: Date;
}
