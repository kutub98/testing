import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceOfOffer } from './Offer.service';

const createOffer = catchAsync(async (req, res) => {
  const result = await ServiceOfOffer.createOffer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offer created Successfully',
    data: result,
  });
});

const findeOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfOffer.findeOfferById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Offer',
    success: true,
    data: result,
  });
});

const getAllOffers = catchAsync(async (req, res) => {
  const result = await ServiceOfOffer.getAllOffers();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Offer',
    success: true,
    data: result,
  });
});

// const updateOfferById = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await ServiceOfOffer.updateOfferById(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Offer is updated successfully',
//     data: result,
//   });
// });

const updateOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const payload = req.body;

  const result = await ServiceOfOffer.updateOfferById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer is updated successfully',
    data: result,
  });
});

const deleteOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfOffer.deleteOfferById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update offer',
    data: result,
  });
});

export const OfferController = {
  createOffer,
  getAllOffers,
  findeOfferById,
  updateOfferById,
  deleteOfferById,
};
