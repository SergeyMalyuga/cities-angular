import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadOffer = createAction('[App Component] Load Offer]');
export const loadOfferSuccess = createAction('[App Component] Load Offer Success]',
  props<{
    offers: OfferPreview[]
  }>());
export const loadOfferFailure = createAction('[App Component] Load Offer Failure]');
