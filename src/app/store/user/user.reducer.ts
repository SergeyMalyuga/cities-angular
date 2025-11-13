import { UserState } from '../../core/models/user.state';
import { AuthorizationStatus, DEFAULT_USER } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions/user.actions';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
  error: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.checkAuthStatusSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(UserActions.checkAuthStatusFailure, (state) => ({
    ...state,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH,
    error: null,
    isLoading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: DEFAULT_USER,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
    error: null,
    isLoading: false,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
);
