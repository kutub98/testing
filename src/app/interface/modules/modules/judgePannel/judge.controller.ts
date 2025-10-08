import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceJudge } from './judge.service';

const createJudge = catchAsync(async (req, res) => {
  const result = await ServiceJudge.createNewJudge(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Judge Panel created Successfully',
    data: result,
  });
});

const findCreateJudgeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceJudge.findJudgeById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Judge Panel',
    success: true,
    data: result,
  });
});

const getAllJudge = catchAsync(async (req, res) => {
  const result = await ServiceJudge.getAllJudge();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Judge Panel',
    success: true,
    data: result,
  });
});

const updateJudgeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ServiceJudge.updateJudgeById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Judge Panel is updated successfully',
    data: result,
  });
});

const deleteJudgeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceJudge.deleteJudgeById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Judge Panel',
    data: result,
  });
});

export const JudgeController = {
  createJudge,
  findCreateJudgeById,
  getAllJudge,
  updateJudgeById,
  deleteJudgeById,
};
