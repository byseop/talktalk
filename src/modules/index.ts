import { combineReducers } from 'redux';
import user, { loginSaga } from './login';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  user,
});

export function* rootSaga() {
  yield all([loginSaga()])
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
