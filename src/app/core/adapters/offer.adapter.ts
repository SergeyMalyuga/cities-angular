import {Offer, OfferPreview} from '../models/offers';

export function adaptOfferToPreview(offer: Offer): OfferPreview {
  return {
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: offer.city,
    location: offer.location,
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: offer.previewImage,
  };
}
