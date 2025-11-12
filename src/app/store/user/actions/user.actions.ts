import {createAction, props} from '@ngrx/store';
import {User} from '../../../core/models/user';

export const checkAuthStatus = createAction(
  '[App component] Check Auth Status]'
);
export const checkAuthStatusSuccess = createAction(
  '[App component] Check Auth Status Success]',
  props<{ user: User }>()
);
export const checkAuthStatusFailure = createAction(
  '[App component] Check Auth Status Failure]'
);
