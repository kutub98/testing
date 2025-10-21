import mongoose, { Schema } from 'mongoose';

export interface IQuestionFile {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: Date;
}

export interface IQuestion extends Document {
  quizId: mongoose.Types.ObjectId;
  questionType: 'MCQ' | 'Short' | 'Written';
  text: string;
  options?: string[]; // Only for MCQ questions
  correctAnswer?: string; // For MCQ and Short questions
  marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  // For Short and Written questions - image upload support
  uploadedImages?: IQuestionFile[];
  // For Written questions - additional fields
  wordLimit?: number;
  timeLimit?: number; // in minutes
  // For participation responses
  participantAnswer?: string;
  participantImages?: IQuestionFile[];
  isAnswered?: boolean;
  answeredAt?: Date;
}

const QuestionFileSchema = new Schema<IQuestionFile>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const QuestionSchema = new Schema<IQuestion>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionType: {
      type: String,
      enum: ['MCQ', 'Short', 'Written'],
      required: true,
    },
    text: { type: String, required: true },
    options: [{ type: String }], // Only required for MCQ
    correctAnswer: { type: String }, // For MCQ and Short questions
    marks: { type: Number, default: 1, min: 1 },
    explanation: { type: String },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    // Image upload support for Short and Written questions
    uploadedImages: [QuestionFileSchema],
    // Additional fields for Written questions
    wordLimit: { type: Number, min: 50 },
    timeLimit: { type: Number, min: 1 }, // in minutes
    // Participation response fields
    participantAnswer: { type: String },
    participantImages: [QuestionFileSchema],
    isAnswered: { type: Boolean, default: false },
    answeredAt: { type: Date },
  },
  { timestamps: true },
);

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
