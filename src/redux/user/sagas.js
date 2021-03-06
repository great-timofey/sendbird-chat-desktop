import { call, put, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { push } from 'connected-react-router';

import { loginUser, registerUser, checkUserSession } from './requests';
import {
  setUser,
  unsetUser,
  connectionCheckingSuccess,
  connectionCheckingStart,
} from './actions';
import * as TYPES from './types';
import { SBconnect, SBdisconnect } from '../../services/SendBird';

function* checkUserSessionWorker(action) {
  try {
    yield put(connectionCheckingStart());
    const { id, token } = action.payload.user.user;
    const { status, data } = yield call(checkUserSession, id, token);
    const { sbUserId, sbAccessToken } = data;
    if (status === 200) {
      yield put(setUser({ ...data }));
      yield call(SBconnect, sbUserId, sbAccessToken);
      yield put(connectionCheckingSuccess());
    }
  } catch (err) {
    yield put(unsetUser());
    yield put(push('/auth/signin'));
  }
}

function* addUserWorker(action) {
  try {
    yield put(connectionCheckingStart());
    const { username, password, email } = action.payload.user;
    const { data } = yield call(registerUser, username, password, email);
    const { sbUserId, sbAccessToken } = data;
    yield call(SBconnect, sbUserId, sbAccessToken);
    yield put(setUser({ ...data }));
    yield put(connectionCheckingSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* fetchUserWorker(action) {
  try {
    yield put(connectionCheckingStart());
    const { username, password, email } = action.payload.user;
    const { data } = yield call(loginUser, username, password, email);
    const { sbUserId, sbAccessToken } = data;
    yield call(SBconnect, sbUserId, sbAccessToken);
    yield put(setUser({ ...data }));
    yield put(connectionCheckingSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* logOutWorker() {
  try {
    yield call(SBdisconnect);
    yield put({ type: 'RESET' });
    yield push('auth/login');
  } catch (err) {
    console.log(err);
  }
}

export function* sagas() {
  yield takeEvery(REHYDRATE, checkUserSessionWorker);
  yield takeEvery(TYPES.FETCH_USER, fetchUserWorker);
  yield takeEvery(TYPES.CREATE_USER, addUserWorker);
  yield takeEvery(TYPES.DISCONNECT_USER, logOutWorker);
}
