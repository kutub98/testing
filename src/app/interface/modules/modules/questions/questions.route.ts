import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createQuestionSchema } from './questions.validation';
import { QuestionController } from './questions.controller';

const router = Router();

router.post(
  '/:eventId/questions',
  validateRequest(createQuestionSchema),
  QuestionController.create,
);

router.get('/:eventId/questions', QuestionController.list);

export const QuestionRoutes = router;
