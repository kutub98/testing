import { Request, Response } from 'express';
import { EventService } from './event.service';
import httpStatus from 'http-status';

import { createEventSchema, updateEventSchema } from './event.validation';
import sendResponse from '../../utils/sendResponse';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const parsed = createEventSchema.parse(req); 
    const event = await EventService.createEvent(parsed.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      error: error.errors ?? error.message,
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const parsed = updateEventSchema.parse(req);
    const event = await EventService.updateEventById(req.params.id, parsed.body);
    if (!event)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: 'Event not found' });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event updated successfully',
      data: event,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      error: error.errors ?? error.message,
    });
  }
};
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventService.getAllEvents();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Events retrieved successfully',
      data: events,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      error: error.errors ?? error.message,
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await EventService.findEventById(req.params.id);
    if (!event)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: 'Event not found' });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event retrieved successfully',
      data: event,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      error: error.errors ?? error.message,
    });
  }
};


export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventService.deleteEventById(req.params.id);
    if (!event)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: 'Event not found' });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      error: error.errors ?? error.message,
    });
  }
};

export class EventController {
  static createEvent = createEvent;
  static updateEventById = updateEvent;
  static getAllEvents = getAllEvents;
  static findEventById = getEventById;
  static deleteEventById = deleteEvent;
}
