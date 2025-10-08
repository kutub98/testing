import { Request, Response } from 'express';
import { Quiz } from './quiz.modal';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { populate } = req.query;
    let query = Quiz.find();
    
    if (populate === 'eventId') {
      query = query.populate('eventId');
    }
    
    const quizzes = await query;
    res.json({ success: true, data: quizzes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { populate } = req.query;
    let query = Quiz.findById(id);
    
    if (populate === 'eventId') {
      query = query.populate('eventId');
    }
    
    const quiz = await query;
    
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    
    res.json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuizzesByEventId = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { populate } = req.query;
    let query = Quiz.find({ eventId });
    
    if (populate === 'eventId') {
      query = query.populate('eventId');
    }
    
    const quizzes = await query;
    res.json({ success: true, data: quizzes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add updateQuiz function
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('questions').populate('eventId');
    
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    
    res.json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add deleteQuiz function
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    
    res.json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
