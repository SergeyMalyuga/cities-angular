import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer} from '@ngrx/store';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null
});

export const favoriteReducer = createReducer(initialState);
