import { IOffer } from './Offer.interface';
import { Offer } from './Offer.modal';

// const createOffer = async (OfferService: IOffer) => {
//   return await Offer.create(OfferService);
// };

const createOffer = async (offerData: IOffer) => {
  try {
    const existingOffer = await Offer.findOne();

    if (existingOffer) {
      return {
        success: false,
        message: 'An offer already exists.',
        data: existingOffer,
      };
    }

    const newOffer = await Offer.create(offerData);

    return {
      success: true,
      message: 'Offer successfully created.',
      data: newOffer,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while creating the offer.',
      error,
    };
  }
};

const findeOfferById = async (OfferId: string) => {
  return await Offer.findById(OfferId);
};

const getAllOffers = async () => {
  return await Offer.find();
};

// const updateOfferById = async (_id: string, payload: Partial<IOffer>) => {
//   const result = await Offer.findByIdAndUpdate(_id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

const updateOfferById = async (_id: string, payload: Partial<IOffer>) => {
  const result = await Offer.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOfferById = async (OfferId: string) => {
  const result = await Offer.findByIdAndDelete(OfferId);

  return result;
};

export const ServiceOfOffer = {
  createOffer,
  getAllOffers,
  updateOfferById,
  deleteOfferById,
  findeOfferById,
};
