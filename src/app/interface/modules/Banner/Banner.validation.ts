import { z } from 'zod';

// Matches your IBanner model
export const createBannerValidationSchema = z.object({
  body: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().url(),
      buttonText: z.string(),
      status: z.enum(['approved', 'pending', 'delete']).optional(),
    }),
  ),
});

export const updateBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    buttonText: z.string().optional(),
    status: z.enum(['approved', 'pending', 'delete']).optional(),
  }),
});

export const BannerValidations = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
};
