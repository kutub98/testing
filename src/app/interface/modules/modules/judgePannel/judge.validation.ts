import { z } from 'zod';

export const createJudgeValidationSchema = z.object({
  body: z.object({
    panel: z.string(),
    description: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        image: z.string().url(),
      }),
    ),
  }),
});

export const updateJudgeValidationSchema = z.object({
  body: z.object({
    panel: z.string().optional(),
    description: z.string().optional(),
    members: z
      .array(
        z.object({
          name: z.string().optional(),
          designation: z.string().optional(),
          image: z.string().url().optional(),
        }),
      )
      .optional(),
  }),
});

export const JudgeValidation = {
  createJudgeValidationSchema,
  updateJudgeValidationSchema,
};
