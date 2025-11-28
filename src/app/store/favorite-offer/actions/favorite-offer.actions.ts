import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadFavoriteOffers = createAction('[Favorite Offer Api] Retrieve Favorite Offers]');
export const loadFavoriteOffersSuccess = createAction('[Favorite Offer Api] Retrieve Favorite Offers Success]', props<{
  favoriteOffers: OfferPreview[]
}>());
export const loadFavoriteOffersFailure = createAction('[Favorite Offer Api] Retrieve Favorite Offers Failure]', props<{
  error: string
}>());

export const changeFavoriteOfferStatus = createAction('[Favorite Offer Api] Change Favorite Offer Status',
  props<{
    offerId: string,
    status: number
  }>());
export const changeFavoriteOfferStatusSuccess = createAction('[Favorite Offer Api] Change Favorite Offer Status Success', props<{
  favoriteOffer: OfferPreview,
}>());
export const changeFavoriteOfferStatusFailure = createAction('[Favorite Offer Api] Change Favorite Offer Status Failure', props<{
  error: string
}>());
