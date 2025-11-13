import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';

export const checkAuthStatus = createAction(
  '[App Component] Check Auth Status]',
);
export const checkAuthStatusSuccess = createAction(
  '[App Component] Check Auth Status Success]',
  props<{ user: User }>(),
);
export const checkAuthStatusFailure = createAction(
  '[App Component] Check Auth Status Failure]',
);
export const login = createAction(
  '[Login Component] Login',
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Login Component] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction(
  '[Login Component] Login Failure',
  props<{ error: string }>(),
);
export const logout = createAction('[Header Component] Logout');
export const logoutSuccess = createAction('[Header Component] Logout Success');
export const logoutFailure = createAction(
  '[Header Component] Logout Failure',
  props<{ error: string }>(),
);
