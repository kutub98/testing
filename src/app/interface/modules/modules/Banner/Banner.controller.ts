import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BannerService } from './Banner.service';

const createBanner = catchAsync(async (req, res) => {
  const result = await BannerService.createBanner(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Banner is created successfully',
    data: result,
  });
});

const findBannerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.findBannerById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner is retrieved successfully',
    data: result,
  });
});

const getAllBanners = catchAsync(async (req, res) => {
  const result = await BannerService.getAllBanners();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner are retrieved successfully',

    data: result,
  });
});

const updateBannerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.updateBannerById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner is updated successfully',
    data: result,
  });
});

const deleteBannerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.deleteBannerById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner is deleted successfully',
    data: result && null,
  });
});

export const BannerController = {
  createBanner,
  getAllBanners,
  findBannerById,
  updateBannerById,
  deleteBannerById,
};
