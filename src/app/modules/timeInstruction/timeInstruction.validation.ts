import { z } from 'zod';

const quizInfoSectionSchema = z.object({
  title: z.string(),
  points: z.array(z.string()),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
});

export const createTimeInstructionValidationSchema = z.object({
  body: z.object({
    timeline: quizInfoSectionSchema,
    instructions: quizInfoSectionSchema,
  }),
});

export const updateTimeInstructionValidationSchema = z.object({
  body: z.object({
    timeline: quizInfoSectionSchema.partial(),
    instructions: quizInfoSectionSchema.partial(),
  }),
});

export const TimeInstructionValidation = {
  createTimeInstructionValidationSchema,
  updateTimeInstructionValidationSchema,
};
