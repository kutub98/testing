import type { IQuizData } from './quizData.interface';
import { QuizDataModel } from './quizData.modal';

const createQuizData = async (QuizDataData: IQuizData) => {
  try {
    // const existingQuizData = await QuizDataModel.findOne();

    // if (existingQuizData) {
    //   return {
    //     success: false,
    //     message: 'An QuizData already exists.',
    //     data: existingQuizData,
    //   };
    // }

    const newQuizData = await QuizDataModel.create(QuizDataData);

    return {
      success: true,
      message: 'QuizData successfully created.',
      data: newQuizData,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while creating the QuizData.',
      error,
    };
  }
};

const findQuizDataById = async (QuizDataId: string) => {
  return await QuizDataModel.findById(QuizDataId);
};

const getAllQuizData = async () => {
  return await QuizDataModel.find();
};

const updateQuizDataById = async (_id: string, payload: Partial<IQuizData>) => {
  const result = await QuizDataModel.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteQuizDataById = async (QuizDataId: string) => {
  const result = await QuizDataModel.findByIdAndDelete(QuizDataId);

  return result;
};

export const ServiceQuizData = {
  createQuizData,
  getAllQuizData,
  updateQuizDataById,
  deleteQuizDataById,
  findQuizDataById,
};
