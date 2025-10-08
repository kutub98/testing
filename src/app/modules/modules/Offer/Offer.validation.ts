import { z } from 'zod';

const createOfferValidationSchema = z.object({
  body: z.object({
    img: z.string().url({ message: 'Image URL must be valid' }),
    amount: z
      .number({ required_error: 'Amount is required' })
      .nonnegative('Amount must be a positive number'),
    dailyGift: z
      .number({ required_error: 'Daily gift is required' })
      .nonnegative('Daily gift must be a positive number'),
    dayLength: z
      .number({ required_error: 'Day length is required' })
      .positive('Day length must be more than zero'),
    status: z.enum(['pending', 'delete', 'approved']).optional(),
  }),
});

export const updateOfferValidationSchema = z.object({
  body: z.object({
    img: z.string().optional(),
    amount: z.number().optional(),
    dailyGift: z.number().optional(),
    dayLength: z.number().optional(),
    status: z.enum(['approved', 'delete', 'pending']).optional(),
  }),
});

export const OfferValidation = {
  createOfferValidationSchema,
  updateOfferValidationSchema,
};
