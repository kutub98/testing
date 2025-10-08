import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { JudgeValidation,  } from './judge.validation';
import { JudgeController } from './judge.controller';



const router = express.Router();

router.post(
  '/',
  validateRequest(JudgeValidation.createJudgeValidationSchema),
  JudgeController.createJudge,
);
router.get('/', JudgeController.getAllJudge);
router.get('/:id', JudgeController.findCreateJudgeById);
router.patch(
  '/:id',
  validateRequest(JudgeValidation?.updateJudgeValidationSchema),
  JudgeController.updateJudgeById,
);
router.delete('/:id', JudgeController.deleteJudgeById);

export const JudgesRouter = router;
