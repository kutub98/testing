import { Event } from "../events/event.model";
import type { IQuestion } from "./questions.interface";
import { Question } from "./questions.model";


export class QuestionService {
  static async createQuestion(eventId: string, data: Partial<IQuestion>) {
    // check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // create question
    const question = await Question.create({ ...data, event: eventId });

    // push into event
    event.questions.push(question._id);
    await event.save();

    return question;
  }

  static async getQuestions(eventId: string) {
    return Question.find({ event: eventId });
  }
}
