import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  createdBy: mongoose.Types.ObjectId;
  quizzes: mongoose.Types.ObjectId[];
  isActive: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: mongoose.Types.ObjectId[];
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
    isActive: { type: Boolean, default: true },
    status: { 
      type: String, 
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming'
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], 
  },
  { timestamps: true }
);

// Update status based on dates
EventSchema.methods.updateStatus = function() {
  const now = new Date();
  if (now < this.startDate) this.status = 'upcoming';
  else if (now > this.endDate) this.status = 'completed';
  else this.status = 'ongoing';
  return this.save();
};

export const Event = mongoose.model<IEvent>("Event", EventSchema);