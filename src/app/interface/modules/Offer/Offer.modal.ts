import mongoose, { Schema } from 'mongoose';
import { IOffer } from './Offer.interface';

const OfferSchema: Schema<IOffer> = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dailyGift: {
    type: Number,
    required: true,
  },
  dayLength: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'delete', 'pending'],
    default: 'pending',
  },
});

export const Offer = mongoose.model<IOffer>('Offer', OfferSchema);
