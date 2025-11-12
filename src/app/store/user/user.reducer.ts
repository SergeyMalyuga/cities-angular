import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer} from '@ngrx/store';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UN_AUTH,
  user: DEFAULT_USER,
}

export const userReducer = createReducer(initialState);
