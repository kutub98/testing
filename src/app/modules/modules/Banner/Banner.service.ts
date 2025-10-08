import { IBanner } from './Banner.interface';
import { Banner } from './Banner.model';

const createBanner = async (service: IBanner) => {
  return await Banner.create(service);
};

const findBannerById = async (serviceId: string) => {
  return await Banner.findById(serviceId);
};

const getAllBanners = async () => {
  const result = await Banner.find();
  return result;
  // const serviceQuery = new QueryBuilder(Service.find(), query)
  //   .search(serviceSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();

  // const result = await serviceQuery.modelQuery;
  // const metaData = await serviceQuery.countTotal();
  // return {
  //   meta: metaData,
  //   data: result,
  // };
};

const updateBannerById = async (
  serviceId: string,
  payload: Partial<IBanner>,
) => {
  const result = await Banner.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBannerById = async (serviceId: string) => {
  const result = await Banner.findByIdAndDelete(serviceId);
  return result;
};

export const BannerService = {
  createBanner,
  getAllBanners,
  findBannerById,
  updateBannerById,
  deleteBannerById,
};
