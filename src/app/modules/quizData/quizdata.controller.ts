import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceQuizData } from './quizData.service';

const createQuizData = catchAsync(async (req, res) => {
  const result = await ServiceQuizData.createQuizData(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offer created Successfully',
    data: result,
  });
});

const findCreateQuizDataById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceQuizData.findQuizDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Offer',
    success: true,
    data: result,
  });
});

const getAllQuizData = catchAsync(async (req, res) => {
  const result = await ServiceQuizData.getAllQuizData();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Offer',
    success: true,
    data: result,
  });
});

const updateQuizDataById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ServiceQuizData.updateQuizDataById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer is updated successfully',
    data: result,
  });
});

const deleteQuizDataById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceQuizData.deleteQuizDataById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update offer',
    data: result,
  });
});

export const QuizDataController = {
  createQuizData,
  findCreateQuizDataById,
  getAllQuizData,
  updateQuizDataById,
  deleteQuizDataById,
};
