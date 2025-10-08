import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceOfFaQ } from './faq.service';

const createFaQ = catchAsync(async (req, res) => {
  const result = await ServiceOfFaQ.createFaQ(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FaQ created Successfully',
    data: result,
  });
});

const findFaQById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfFaQ.findFaQById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single FaQ',
    success: true,
    data: result,
  });
});

const getAllFaQs = catchAsync(async (req, res) => {
  const result = await ServiceOfFaQ.getAllFaQs();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All FaQ',
    success: true,
    data: result,
  });
});

// const updateFaQById = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await ServiceOfFaQ.updateFaQById(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'FaQ is updated successfully',
//     data: result,
//   });
// });

const updateFaQById = catchAsync(async (req, res) => {
  const { id } = req.params;
  

  const payload = req.body;
  

  const result = await ServiceOfFaQ.updateFaQById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FaQ is updated successfully',
    data: result,
  });
});

const deleteFaQById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfFaQ.deleteFaQById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update FaQ',
    data: result,
  });
});

export const FaQController = {
  createFaQ,
  getAllFaQs,
  findFaQById,
  updateFaQById,
  deleteFaQById,
};
