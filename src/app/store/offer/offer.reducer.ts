import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {OffersState} from '../../core/models/offers.state';
import {createReducer, on} from '@ngrx/store';
import {loadOffers, loadOffersFailure, loadOffersSuccess,} from './actions/offer.actions';
import {changeFavoriteOfferStatusSuccess} from '../favorite-offer/actions/favorite-offer.actions';

export const offerAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
const initialState: OffersState = offerAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer(
  initialState,
  on(loadOffers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadOffersSuccess, (state, { offers }) =>
    offerAdapter.setAll(offers, { ...state, isLoading: false }),
  ),
  on(loadOffersFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(changeFavoriteOfferStatusSuccess, (state, { favoriteOffer }) =>
    offerAdapter.updateOne(
      {
        id: favoriteOffer.id,
        changes: { isFavorite: favoriteOffer.isFavorite },
      },
      state,
    ),
  ),
);
