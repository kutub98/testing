import { Request, Response } from 'express';
import { QuestionService } from './questions.service';


export class QuestionController {
  static async create(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const question = await QuestionService.createQuestion(eventId, req.body);

      return res.status(201).json({
        success: true,
        message: 'Question uploaded successfully',
        data: question,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading question',
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const questions = await QuestionService.getQuestions(eventId);

      return res.status(200).json({
        success: true,
        message: 'Questions fetched successfully',
        data: questions,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Error fetching questions',
      });
    }
  }
}
