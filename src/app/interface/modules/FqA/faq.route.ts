import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { FaQValidation } from './faq.validation';
import { FaQController } from './faq.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FaQValidation.createFaQValidationSchema),
  FaQController.createFaQ,
);
router.get('/', FaQController.getAllFaQs);
router.get('/:id', FaQController.findFaQById);
router.patch(
  '/:id',
  validateRequest(FaQValidation?.updateFaQValidationSchema),
  FaQController.updateFaQById,
);
router.delete('/:id', FaQController.deleteFaQById);

export const FaQRouter = router;
