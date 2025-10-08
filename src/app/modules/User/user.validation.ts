import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    img: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['admin', 'general', 'vip', 'moderator']).optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    img: z.string().optional(),

    role: z.enum(['admin', 'moderator', 'vip', 'general']).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
