import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { updateEventSchema } from './event.validation';
import { EventController } from './event.controller';

const router = Router();

router.post(
  '/',
  validateRequest(updateEventSchema),
  EventController.createEvent,
);
router.put(
  '/:id',
  validateRequest(updateEventSchema),
  EventController.updateEventById,
);
router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.findEventById);
router.delete('/:id', EventController.deleteEventById);

export const EventRouter = router;
