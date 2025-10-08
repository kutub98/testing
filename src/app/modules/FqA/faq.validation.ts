import { z } from 'zod';

const singleFaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const createFaQValidationSchema = z.object({
  body: z.object({
    faq: z.array(singleFaqSchema),
    status: z.enum(['pending', 'delete', 'approved']).optional(),
  }),
});

export const updateFaQValidationSchema = z.object({
  body: z.object({
    faq: z.array(singleFaqSchema).optional(),
    status: z.enum(['approved', 'delete', 'pending']).optional(),
  }),
});

export const FaQValidation = {
  createFaQValidationSchema,
  updateFaQValidationSchema,
};
