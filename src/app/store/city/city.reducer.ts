import { City } from '../../core/models/city';
import { DEFAULT_CITY } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  changeCity,
  changeCityFailure,
  changeCitySuccess,
} from './actions/city.actions';

const initialState: City = DEFAULT_CITY;

export const cityReducer = createReducer(
  initialState,
  on(changeCity, (state: City) => ({
    ...state,
  })),
  on(changeCitySuccess, (state: City, { city }) => ({
    ...state,
    name: city.name,
    location: city.location,
  })),
  on(changeCityFailure, (state: City) => ({
    ...state,
  })),
);
