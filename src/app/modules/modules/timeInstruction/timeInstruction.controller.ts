import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceTimeInstruction } from './timeInstruction.service';

const createTimeInstruction = catchAsync(async (req, res) => {
  const result = await ServiceTimeInstruction.createTimeInstruction(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Time Instruction created Successfully',
    data: result,
  });
});

const findCreateTimeInstructionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceTimeInstruction.findTimeInstructionById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Offer',
    success: true,
    data: result,
  });
});

const getAllTimeInstruction = catchAsync(async (req, res) => {
  const result = await ServiceTimeInstruction.getAllTimeInstruction();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Time Instruction',
    success: true,
    data: result,
  });
});

const updateTimeInstructionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ServiceTimeInstruction.updateTimeInstructionById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer is updated successfully',
    data: result,
  });
});

const deleteTimeInstructionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceTimeInstruction.deleteTimeInstructionById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update offer',
    data: result,
  });
});

export const TimeInstructionController = {
  createTimeInstruction,
  findCreateTimeInstructionById,
  getAllTimeInstruction,
  updateTimeInstructionById,
  deleteTimeInstructionById,
};
