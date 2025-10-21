import { Router } from 'express';
import {
  createQuestion,
  getQuestionById,
  getQuestions,
  getQuestionsByQuizId,
  deleteQuestion,
  updateQuestion,
  uploadQuestionImages,
  submitAnswer,
  getQuestionsByType,
  updateQuestionWithImages,
  bulkCreateQuestions,
  bulkDeleteQuestions,
} from './questions.controller';
import { questionImageUpload } from '../../config/questionUpload';

const QuestionRouter = Router();

// Basic CRUD operations (order matters: place specific routes before ":id")
QuestionRouter.post('/', createQuestion);
QuestionRouter.post('/bulk', bulkCreateQuestions);
QuestionRouter.delete('/bulk', bulkDeleteQuestions);
QuestionRouter.get('/', getQuestions);

// Specific routes first
QuestionRouter.get('/quiz/:quizId', getQuestionsByQuizId);
QuestionRouter.get('/type/:type', getQuestionsByType);

// Generic ID routes
QuestionRouter.get('/:id', getQuestionById);
QuestionRouter.put('/:id', updateQuestion);
QuestionRouter.delete('/:id', deleteQuestion);

// Image upload routes
QuestionRouter.post(
  '/upload-images',
  questionImageUpload.array('images', 5),
  uploadQuestionImages,
);
QuestionRouter.put('/:questionId/images', updateQuestionWithImages);

// Answer submission routes
QuestionRouter.post(
  '/:questionId/submit-answer',
  questionImageUpload.array('images', 5),
  submitAnswer,
);

export { QuestionRouter };
