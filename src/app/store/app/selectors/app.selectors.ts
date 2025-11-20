import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';
import {UserState} from '../../../core/models/user.state';
import {City} from '../../../core/models/city';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');
const offerSelectors = offerAdapter.getSelectors();

const selectUserState = createFeatureSelector<AppState['user']>('user');

const selectCityState = createFeatureSelector<AppState['city']>('city');

export const selectOffers = createSelector(
  selectOfferState,
  offerSelectors.selectAll,
);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state: UserState) => state.authorizationStatus,
);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user,
);

export const selectCity = createSelector(
  selectCityState,
  (state: City) => state
)
