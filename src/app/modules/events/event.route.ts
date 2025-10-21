import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addParticipant,
  getEventWithParticipants,
} from './event.controller';

const EventRouter = Router();

EventRouter.post('/', createEvent);
EventRouter.get('/', getEvents);
EventRouter.get('/:id', getEventById);
EventRouter.get('/:id/participants', getEventWithParticipants);
EventRouter.post('/add-participant', addParticipant);
EventRouter.patch('/:id', updateEvent);
EventRouter.delete('/:id', deleteEvent);

export { EventRouter };
