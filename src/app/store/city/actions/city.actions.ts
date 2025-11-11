import {createAction, props} from '@ngrx/store';
import {City} from '../../../core/models/city';

export const changeCity = createAction(
  '[Main Component] change City',
  props<{ city: City }>(),
);
export const changeCitySuccess = createAction(
  '[Main Component] change City Success',
  props<{ city: City }>(),
);
export const changeCityFailure = createAction(
  '[Main Component] change City Failure', props<{ error: string }>(),
);
