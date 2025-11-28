import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadFavoriteOffers = createAction('[Favorite Offers Api] Retrieve Favorite Offers]');
export const loadFavoriteOffersSuccess = createAction('[Favorite Offers Api] Retrieve Favorite Offers Success]', props<{
  favoriteOffers: OfferPreview[]
}>());
export const loadFavoriteOffersFailure = createAction('[Favorite Offers Api] Retrieve Favorite Offers Failure]', props<{
  error: string
}>());
