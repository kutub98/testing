import type { IQuizTimelineAndInstructionsType } from './timeInstruction.interface';
import { TimeInstructionModal } from './timeInstruction.modal';

const createTimeInstruction = async (
  TimeInstructionData: IQuizTimelineAndInstructionsType,
) => {
  try {
    // const existingTimeInstruction = await TimeInstructionModal.findOne();

    // if (existingTimeInstruction) {
    //   return {
    //     success: false,
    //     message: 'An TimeInstruction already exists.',
    //     data: existingTimeInstruction,
    //   };
    // }

    const newTimeInstruction =
      await TimeInstructionModal.create(TimeInstructionData);

    return {
      success: true,
      message: 'TimeInstruction successfully created.',
      data: newTimeInstruction,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while creating the TimeInstruction.',
      error,
    };
  }
};

const findTimeInstructionById = async (TimeInstructionId: string) => {
  return await TimeInstructionModal.findById(TimeInstructionId);
};

const getAllTimeInstruction = async () => {
  return await TimeInstructionModal.find();
};

const updateTimeInstructionById = async (
  _id: string,
  payload: Partial<IQuizTimelineAndInstructionsType>,
) => {
  const result = await TimeInstructionModal.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTimeInstructionById = async (TimeInstructionId: string) => {
  const result =
    await TimeInstructionModal.findByIdAndDelete(TimeInstructionId);

  return result;
};

export const ServiceTimeInstruction = {
  createTimeInstruction,
  getAllTimeInstruction,
  updateTimeInstructionById,
  deleteTimeInstructionById,
  findTimeInstructionById,
};
