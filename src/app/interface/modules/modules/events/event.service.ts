// import { Event } from './event.model';
// import { IEvent } from './event.interface';

import type { IEvent } from './event.interface';
import { Event } from './event.model';

const createEvent = async (service: IEvent) => {
  return await Event.create(service);
};

const findEventById = async (serviceId: string) => {
  return await Event.findById(serviceId);
};

const getAllEvents = async () => {
  const result = await Event.find();
  return result;
};

const updateEventById = async (serviceId: string, payload: Partial<IEvent>) => {
  const result = await Event.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteEventById = async (serviceId: string) => {
  const result = await Event.findByIdAndDelete(serviceId);
  return result;
};

export const EventService = {
  createEvent,
  getAllEvents,
  findEventById,
  updateEventById,
  deleteEventById,
};
