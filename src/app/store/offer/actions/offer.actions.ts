import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadOffers = createAction('[App Component] Load Offer]');
export const loadOffersSuccess = createAction(
  '[App Component] Load Offer Success]',
  props<{
    offers: OfferPreview[];
  }>()
);
export const loadOffersFailure = createAction(
  '[App Component] Load Offer Failure]'
);
