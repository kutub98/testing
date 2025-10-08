import { z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    type: z.enum(['mcq', 'short', 'written']),
    options: z.array(z.string()).optional(),
    answer: z.string().min(1, 'Answer is required'),
    marks: z.number().min(1, 'Marks must be at least 1'),
  }),
});
