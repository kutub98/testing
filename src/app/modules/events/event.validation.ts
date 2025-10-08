import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    event_name: z.string().min(1, 'Event name is required'),
    total_question: z.number().min(0),
    duration: z.object({
      hours: z.number().min(0).optional(),
      minutes: z.number().min(0).optional(),
      seconds: z.number().min(0).optional(),
    }),
    start_time: z.string().min(1, 'Start time is required'),
    end_time: z.string().min(1, 'End time is required'),
    time_for: z.object({
      hours: z.number().min(0).optional(),
      minutes: z.number().min(0).optional(),
      seconds: z.number().min(0).optional(),
      short: z.number().min(0).optional(),
      written: z.number().min(0).optional(),
      mcq: z.number().min(0).optional(),
    }),
  }),
});

export const updateEventSchema = createEventSchema.partial();
