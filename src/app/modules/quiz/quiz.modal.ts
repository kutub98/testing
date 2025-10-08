import mongoose, { Schema } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  eventId: mongoose.Types.ObjectId;
  duration: number;
  totalMarks: number;
  questions: mongoose.Types.ObjectId[];
  isActive: boolean;
  passingMarks: number;
  instructions?: string;
}

const QuizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    duration: { type: Number, required: true, min: 1 },
    totalMarks: { type: Number, default: 0 },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    isActive: { type: Boolean, default: true },
    passingMarks: { type: Number, default: 0 },
    instructions: { type: String },
  },
  { timestamps: true },
);

// Auto-calculate total marks
QuizSchema.pre('save', async function(next) {
  if (this.questions.length > 0) {
    const Question = mongoose.model('Question');
    const questions = await Question.find({ _id: { $in: this.questions } });
    this.totalMarks = questions.reduce((total, q) => total + (q.marks || 0), 0);
  }
  next();
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);