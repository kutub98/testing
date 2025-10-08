import { z } from 'zod';

const createQuizDataValidationSchema = z.object({
  body: z.object({
    quizInfo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    competitionDetails: z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
    rules: z.object({
      title: z.string(),
      items: z.array(z.string()),
    }),
  }),
});

export const updateQuizDataValidationSchema = z.object({
  body: z.object({
    quizInfo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    competitionDetails: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
      })
      .optional(),

    rules: z.object({
      title: z.string().optional(),
      items: z.array(z.string()).optional(),
    }),
  }),
});

export const QuizDataValidation = {
  createQuizDataValidationSchema,
  updateQuizDataValidationSchema,
};
