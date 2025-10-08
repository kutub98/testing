import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { Participation } from './participation.model';
import { questionImageUpload, getFileInfo } from '../../config/questionUpload';
import { Event } from '../events/event.model';

export const createParticipation = async (req: Request, res: Response) => {
  try {
    // Create participation
    const participation = await Participation.create(req.body);

    // Update event participants list
    await Event.findByIdAndUpdate(
      participation.quizId,
      {
        $addToSet: { participants: participation.studentId },
      },
      { new: true },
    );

    res.status(201).json({ success: true, data: participation });
  } catch (error: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    // Handle duplicate participation error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already participated in this quiz',
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getParticipations = async (req: AuthRequest, res: Response) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Filter participations by the authenticated user
    const participations = await Participation.find({ studentId: userId })
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');

    res.json({ success: true, data: participations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getParticipationById = async (req: Request, res: Response) => {
  try {
    const participation = await Participation.findById(req.params.id)
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');
    if (!participation)
      return res
        .status(404)
        .json({ success: false, message: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkParticipation = async (req: Request, res: Response) => {
  try {
    const { studentId, quizId } = req.body;
    const participation = await Participation.findOne({ studentId, quizId });

    if (participation) {
      return res.json({
        success: true,
        hasParticipated: true,
        status: participation.status,
      });
    }

    res.json({ success: true, hasParticipated: false });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateParticipation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const participation = await Participation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    )
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId');

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: 'Participation not found',
      });
    }

    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit participation answer with optional images for a specific question
export const submitParticipationAnswer = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params; // participation id
    const {
      questionId,
      selectedOption,
      participantAnswer,
      isCorrect,
      marksObtained,
    } = req.body;

    const participation = await Participation.findById(id);
    if (!participation) {
      return res
        .status(404)
        .json({ success: false, message: 'Participation not found' });
    }

    let participantImages: any[] = [];
    if (req.files) {
      const files = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      // @ts-ignore
      participantImages = files.map((file) => getFileInfo(file));
    }

    const answers = participation.answers || [];
    const idx = answers.findIndex(
      (a: any) => a.questionId?.toString() === questionId,
    );
    const updated = {
      questionId,
      selectedOption: selectedOption || '',
      participantAnswer: participantAnswer || '',
      isCorrect: !!isCorrect,
      marksObtained: Number(marksObtained) || 0,
      participantImages,
    } as any;

    if (idx >= 0) {
      answers[idx] = { ...(answers[idx] as any), ...updated };
    } else {
      answers.push(updated);
    }

    participation.answers = answers as any;
    participation.totalScore = answers.reduce(
      (sum: number, a: any) => sum + (a.marksObtained || 0),
      0,
    );

    await participation.save();

    res.json({ success: true, data: participation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteParticipation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const participation = await Participation.findByIdAndDelete(id);

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: 'Participation not found',
      });
    }

    res.json({ success: true, message: 'Participation deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getParticipationsByQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;

    const participations = await Participation.find({ quizId })
      .populate('studentId', 'fullNameEnglish fullNameBangla contact')
      .populate('quizId')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: participations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
