import { IFaQ } from './faq.interface';
import { FaQ } from './faq.modal';

// const createFaQ = async (FaQService: IFaQ) => {
//   return await FaQ.create(FaQService);
// };

const createFaQ = async (FaQData: IFaQ) => {
  try {
    const existingFaQ = await FaQ.findOne();

    if (existingFaQ) {
      return {
        success: false,
        message: 'An FaQ already exists.',
        data: existingFaQ,
      };
    }

    const newFaQ = await FaQ.create(FaQData);

    return {
      success: true,
      message: 'FaQ successfully created.',
      data: newFaQ,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while creating the FaQ.',
      error,
    };
  }
};

const findFaQById = async (FaQId: string) => {
  return await FaQ.findById(FaQId);
};

const getAllFaQs = async () => {
  return await FaQ.find();
};

// const updateFaQById = async (_id: string, payload: Partial<IFaQ>) => {
//   const result = await FaQ.findByIdAndUpdate(_id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

const updateFaQById = async (_id: string, payload: Partial<IFaQ>) => {
  
  const result = await FaQ.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFaQById = async (FaQId: string) => {
  const result = await FaQ.findByIdAndDelete(FaQId);

  return result;
};

export const ServiceOfFaQ = {
  createFaQ,
  getAllFaQs,
  updateFaQById,
  deleteFaQById,
  findFaQById,
};
