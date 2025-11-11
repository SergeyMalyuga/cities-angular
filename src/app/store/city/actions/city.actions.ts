import {createAction, props} from '@ngrx/store';
import {City} from '../../../core/models/city';

export const changeCity = createAction('[Main Component] change City');
export const changeCitySuccess = createAction('[Main Component] change City Success', props<{ city: City }>());
export const changeCityFailures = createAction('[Main Component] change City Failure');
