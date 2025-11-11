import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const offerSelectorState = createFeatureSelector<AppState['offers']>('offers');
const offerSelectors = offerAdapter.getSelectors();

export const selectOffers = createSelector(
  offerSelectorState,
  offerSelectors.selectAll
)
