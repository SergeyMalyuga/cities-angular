import { OffersState } from './offers.state';
import { City } from './city';

export interface AppState {
  /*favoriteOffers: FavoriteOffersState;
  user: UserState;*/
  city: City;
  offers: OffersState;
}
