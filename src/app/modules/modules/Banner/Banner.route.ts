import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BannerController } from './Banner.controller';
import { createBannerValidationSchema, updateBannerValidationSchema } from './Banner.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createBannerValidationSchema),
  BannerController.createBanner,
);

router.get('/', BannerController.getAllBanners);

router.get('/:id', BannerController.findBannerById);

router.patch(
  '/:id',
  validateRequest(updateBannerValidationSchema),
  BannerController.updateBannerById,
);

router.delete('/:id', BannerController.deleteBannerById);

export const BannerRoutes = router;
