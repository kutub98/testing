import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { TimeInstructionValidation } from './timeInstruction.validation';
import { TimeInstructionController } from './timeInstruction.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    TimeInstructionValidation.createTimeInstructionValidationSchema,
  ),
  TimeInstructionController.createTimeInstruction,
);
router.get('/', TimeInstructionController.getAllTimeInstruction);
router.get('/:id', TimeInstructionController.findCreateTimeInstructionById);
router.patch(
  '/:id',
  validateRequest(
    TimeInstructionValidation?.updateTimeInstructionValidationSchema,
  ),
  TimeInstructionController.updateTimeInstructionById,
);
router.delete('/:id', TimeInstructionController.deleteTimeInstructionById);

export const TimeInstructionRouter = router;
