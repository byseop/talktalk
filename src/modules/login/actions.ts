import { UserDataTypes } from './types';
import { AxiosError } from 'axios';

export const LOGIN_START = 'login/LOGIN_START' as const;
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS' as const;
export const LOGIN_FAIL = 'login/LOGIN_FAIL' as const;
export const ALREADY_LOGIN = 'login/ALREADY_LOGIN' as const;

export const loginStart = (token: string) => ({
  type: LOGIN_START,
  payload: token
});
export const loginSuccess = (userData: UserDataTypes) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});
export const loginFail = (error: AxiosError) => ({
  type: LOGIN_FAIL,
  payload: error
});
export const alreadyLogin = (savedLoginData: UserDataTypes) => ({
  type: ALREADY_LOGIN,
  payload: savedLoginData
});

export type LoginActionTypes =
  | ReturnType<typeof loginStart>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFail>
  | ReturnType<typeof alreadyLogin>;
