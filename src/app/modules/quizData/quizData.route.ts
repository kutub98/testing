import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { QuizDataController } from './quizdata.controller';
import { QuizDataValidation } from './quizData.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(QuizDataValidation.createQuizDataValidationSchema),
  QuizDataController.createQuizData,
);
router.get('/', QuizDataController.getAllQuizData);
router.get('/:id', QuizDataController.findCreateQuizDataById);
router.patch(
  '/:id',
  validateRequest(QuizDataValidation?.updateQuizDataValidationSchema),
  QuizDataController.updateQuizDataById,
);
router.delete('/:id', QuizDataController.deleteQuizDataById);

export const QuizDataRouter = router;
