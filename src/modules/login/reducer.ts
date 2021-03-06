import { UserDataTypes } from './types';
import { AxiosError } from 'axios';
import {
  LoginActionTypes,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ALREADY_LOGIN
} from './actions';

export type State = {
  loading: boolean;
  data: UserDataTypes | null;
  error: AxiosError | null;
};

const initialState: State = {
  loading: false,
  data: null,
  error: null
};

export default function user(
  state: State = initialState,
  action: LoginActionTypes
): State {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ALREADY_LOGIN:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}
