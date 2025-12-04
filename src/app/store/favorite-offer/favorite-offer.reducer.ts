import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {
  changeFavoriteOfferStatus, changeFavoriteOfferStatusFailure, changeFavoriteOfferStatusSuccess,
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess
} from './actions/favorite-offer.actions';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null
});

export const favoriteReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, state => ({
    ...state, isLoading: true, error: null
  })),
  on(loadFavoriteOffersSuccess, (state, {favoriteOffers}) =>
    favoriteOfferAdapter.setAll(favoriteOffers, {...state, isLoading: false, error: null}),
  ),
  on(loadFavoriteOffersFailure, (state, {error}) => ({
    ...state, error, isLoading: false
  })),
  on(changeFavoriteOfferStatus, state => ({
    ...state, isLoading: true, error: null
  })),
  on(changeFavoriteOfferStatusSuccess, (state, {favoriteOffer}) => {
    if (favoriteOffer.isFavorite) {
      return favoriteOfferAdapter.addOne(favoriteOffer, {...state, isLoading: false, error: null});
    } else {
      return favoriteOfferAdapter.removeOne(favoriteOffer.id, {...state, isLoading: false, error: null});
    }
  }),
  on(changeFavoriteOfferStatusFailure, (state, {error}) => ({
    ...state, error, isLoading: false
  }))
);
