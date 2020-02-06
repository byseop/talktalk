import { getUser } from 'src/api/github/user';
import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGIN_START, loginStart, loginSuccess, loginFail } from './actions';
import { UserDataTypes } from './types';

function* login(action: ReturnType<typeof loginStart>) {
  const response: UserDataTypes = yield call(getUser, action.payload);
  try {
    yield put(loginSuccess(response));
  } catch(e) {
    yield put(loginFail(e));
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_START, login);
}