import { Schema, model, Types } from 'mongoose';
import { IEvent } from './events.interface';

const EventSchema = new Schema<IEvent>(
  {
    event_name: { type: String, required: true },
    total_question: { type: Number, required: true },
    duration: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 0 },
    },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    time_for: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 0 },
      short: { type: Number, default: 0 },
      written: { type: Number, default: 0 },
      mcq: { type: Number, default: 0 },
    },
    questions: [{ type: Types.ObjectId, ref: 'Question', default: [] }], // ✅ default empty array
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', EventSchema);