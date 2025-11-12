import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import * as UserActions from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.checkAuthStatusSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH
  })),
  on(UserActions.checkAuthStatusFailure, (state) => ({
    ...state,
    authorizationStatus: AuthorizationStatus.UN_AUTH
  }))
);
