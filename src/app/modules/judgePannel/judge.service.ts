import type { IJudge } from './judge.interface';
import { JudgeModel } from './judge.modal';

const createNewJudge = async (JudgeData: IJudge) => {
  try {
    // const existingJudge = await JudgeModel.findOne();

    // if (existingJudge) {
    //   return {
    //     success: false,
    //     message: 'An Judge already exists.',
    //     data: existingJudge,
    //   };
    // }

    const newJudge = await JudgeModel.create(JudgeData);

    return {
      success: true,
      message: 'Judge successfully created.',
      data: newJudge,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while creating the Judge.',
      error,
    };
  }
};

const findJudgeById = async (JudgeId: string) => {
  return await JudgeModel.findById(JudgeId);
};

const getAllJudge = async () => {
  return await JudgeModel.find();
};

const updateJudgeById = async (_id: string, payload: Partial<IJudge>) => {
  const result = await JudgeModel.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteJudgeById = async (JudgeId: string) => {
  const result = await JudgeModel.findByIdAndDelete(JudgeId);

  return result;
};

export const ServiceJudge = {
  createNewJudge,
  getAllJudge,
  updateJudgeById,
  deleteJudgeById,
  findJudgeById,
};
