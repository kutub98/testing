import { Request, Response } from 'express';
import { Question, IQuestionFile } from './questions.model';
import {
  questionImageUpload,
  getFileInfo,
  deleteQuestionFile,
} from '../../config/questionUpload';
import multer from 'multer';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { populate } = req.query;
    let query = Question.find();

    if (populate === 'quizId') {
      query = query.populate('quizId');
    }

    const questions = await query;
    res.json({ success: true, data: questions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { populate } = req.query;
    let query = Question.findById(id);

    if (populate === 'quizId') {
      query = query.populate('quizId');
    }

    const question = await query;

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: 'Question not found' });
    }

    res.json({ success: true, data: question });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuestionsByQuizId = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { populate } = req.query;
    let query = Question.find({ quizId });

    if (populate === 'quizId') {
      query = query.populate('quizId');
    }

    const questions = await query;
    res.json({ success: true, data: questions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update single question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const question = await Question.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('quizId');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.json({
      success: true,
      message: 'Question updated successfully',
      data: question,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update question',
    });
  }
};

// Delete single question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully',
      data: { deletedId: id },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete question',
    });
  }
};

// Upload images for questions (Short and Written types)
export const uploadQuestionImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    const uploadedFiles: IQuestionFile[] = files.map((file) =>
      getFileInfo(file),
    );

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadedFiles,
    });
  } catch (error: any) {
    // Clean up uploaded files if there's an error
    if (req.files) {
      const files = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      files.forEach((file) => {
        deleteQuestionFile(file.path);
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit answer for a question (with optional image upload)
export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { answer, participantId } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Handle image uploads for Short and Written questions
    let participantImages: IQuestionFile[] = [];
    if (
      req.files &&
      (question.questionType === 'Short' || question.questionType === 'Written')
    ) {
      const files = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      participantImages = files.map((file) => getFileInfo(file));
    }

    // Update question with participant's answer
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        participantAnswer: answer,
        participantImages: participantImages,
        isAnswered: true,
        answeredAt: new Date(),
      },
      { new: true },
    );

    res.json({
      success: true,
      message: 'Answer submitted successfully',
      data: updatedQuestion,
    });
  } catch (error: any) {
    // Clean up uploaded files if there's an error
    if (req.files) {
      const files = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      files.forEach((file) => {
        deleteQuestionFile(file.path);
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get questions by type
export const getQuestionsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { quizId, populate } = req.query;

    let query: any = { questionType: type };
    if (quizId) {
      query.quizId = quizId;
    }

    let questionsQuery = Question.find(query);

    if (populate === 'quizId') {
      questionsQuery = questionsQuery.populate('quizId');
    }

    const questions = await questionsQuery;
    res.json({ success: true, data: questions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update question with uploaded images
export const updateQuestionWithImages = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { uploadedImages } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Validate that question type supports image uploads
    if (question.questionType === 'MCQ') {
      return res.status(400).json({
        success: false,
        message: 'MCQ questions do not support image uploads',
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { uploadedImages },
      { new: true },
    );

    res.json({
      success: true,
      message: 'Question updated with images successfully',
      data: updatedQuestion,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk create questions
export const bulkCreateQuestions = async (req: Request, res: Response) => {
  try {
    const { questions } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required and must not be empty',
      });
    }

    // Validate each question
    const validatedQuestions = questions.map((question: any, index: number) => {
      if (!question.quizId) {
        throw new Error(`Question ${index + 1}: quizId is required`);
      }
      if (!question.text) {
        throw new Error(`Question ${index + 1}: text is required`);
      }
      if (
        !question.questionType ||
        !['MCQ', 'Short', 'Written'].includes(question.questionType)
      ) {
        throw new Error(
          `Question ${index + 1}: questionType must be MCQ, Short, or Written`,
        );
      }
      if (!question.marks || question.marks < 1) {
        throw new Error(`Question ${index + 1}: marks must be at least 1`);
      }
      if (
        !question.difficulty ||
        !['easy', 'medium', 'hard'].includes(question.difficulty)
      ) {
        throw new Error(
          `Question ${index + 1}: difficulty must be easy, medium, or hard`,
        );
      }

      // Validate MCQ specific fields
      if (question.questionType === 'MCQ') {
        if (
          !question.options ||
          !Array.isArray(question.options) ||
          question.options.length < 2
        ) {
          throw new Error(
            `Question ${index + 1}: MCQ questions must have at least 2 options`,
          );
        }
        if (!question.correctAnswer) {
          throw new Error(
            `Question ${index + 1}: MCQ questions must have a correct answer`,
          );
        }
        if (!question.options.includes(question.correctAnswer)) {
          throw new Error(
            `Question ${index + 1}: correct answer must be one of the options`,
          );
        }
      }

      // Validate Written specific fields (Short questions have optional correctAnswer)
      if (question.questionType === 'Written' && !question.correctAnswer) {
        throw new Error(
          `Question ${index + 1}: Written questions must have a correct answer`,
        );
      }

      // Validate Written specific fields
      if (question.questionType === 'Written') {
        if (question.wordLimit && question.wordLimit < 10) {
          throw new Error(
            `Question ${index + 1}: word limit must be at least 10`,
          );
        }
        if (question.timeLimit && question.timeLimit < 1) {
          throw new Error(
            `Question ${index + 1}: time limit must be at least 1 minute`,
          );
        }
      }

      return {
        quizId: question.quizId,
        questionType: question.questionType,
        text: question.text,
        options: question.options || [],
        correctAnswer: question.correctAnswer || '',
        marks: question.marks,
        difficulty: question.difficulty,
        wordLimit: question.wordLimit,
        timeLimit: question.timeLimit,
        explanation: question.explanation || '',
      };
    });

    // Create all questions
    const createdQuestions = await Question.insertMany(validatedQuestions);

    res.status(201).json({
      success: true,
      message: `${createdQuestions.length} questions created successfully`,
      data: createdQuestions,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create questions',
    });
  }
};

// Bulk delete questions
export const bulkDeleteQuestions = async (req: Request, res: Response) => {
  try {
    const { questionIds } = req.body;

    if (
      !questionIds ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Question IDs array is required and must not be empty',
      });
    }

    // Validate that all IDs are valid MongoDB ObjectIds
    const validIds = questionIds.filter(
      (id: string) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id),
    );

    if (validIds.length !== questionIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Some question IDs are invalid',
      });
    }

    // Delete questions
    const result = await Question.deleteMany({
      _id: { $in: validIds },
    });

    res.json({
      success: true,
      message: `${result.deletedCount} questions deleted successfully`,
      data: {
        deletedCount: result.deletedCount,
        deletedIds: validIds,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete questions',
    });
  }
};
