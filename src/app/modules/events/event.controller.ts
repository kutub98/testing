import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Event } from './event.model';

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    // await event.updateStatus();
    res.status(201).json({ success: true, data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate('quizzes');
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Event
export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId).populate('quizzes');

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error: any) {
    console.error('Error loading event:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });

    Object.assign(event, req.body);
    // if (typeof event.updateStatus === 'function') {
    //   await event.updateStatus();
    // }
    await event.save();

    res.json({ success: true, data: event });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Add participant to event
export const addParticipant = async (req: Request, res: Response) => {
  try {
    const { eventId, studentId } = req.body;

    // Validate required fields
    if (!eventId || !studentId) {
      return res.status(400).json({
        success: false,
        message: 'Event ID and Student ID are required',
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    // Convert studentId to ObjectId for proper comparison
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    // Check if student is already a participant using ObjectId comparison
    const isAlreadyParticipant = event.participants.some((participantId) => {
      return (
        participantId.toString() === studentObjectId.toString() ||
        (participantId &&
          participantId.equals &&
          participantId.equals(studentObjectId))
      );
    });

    if (isAlreadyParticipant) {
      // Return success even if already a participant
      const populatedEvent = await Event.findById(eventId)
        .populate('quizzes')
        .populate(
          'participants',
          'fullNameEnglish fullNameBangla contact role',
        );

      return res.json({
        success: true,
        data: populatedEvent,
        message: 'Student is already a participant',
      });
    }

    // Add student to participants array
    event.participants.push(studentObjectId);
    await event.save();

    // Populate and return event with participant details
    const populatedEvent = await Event.findById(eventId)
      .populate('quizzes')
      .populate('participants', 'fullNameEnglish fullNameBangla contact role');

    res.json({ success: true, data: populatedEvent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get event with participants
export const getEventWithParticipants = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('quizzes')
      .populate('participants', 'fullNameEnglish fullNameBangla contact role');

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });

    await event.deleteOne();
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
