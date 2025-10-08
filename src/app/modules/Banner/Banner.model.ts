import { Schema, model } from 'mongoose';
import type { IBanner } from './Banner.interface';

const BannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'delete'],
      default: 'approved',
    },
  },
  {
    timestamps: true,
  },
);

export const Banner = model<IBanner>('Banner', BannerSchema);
