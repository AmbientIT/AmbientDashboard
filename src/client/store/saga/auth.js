import { takeEvery, take } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { LOGOUT, LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGIN, LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/auth'
import { removeToken, setToken } from './lib/authHelpers'
import { googleAuth } from '../../lib/auth/google'

function* logoutSaga() {
  yield put({ type: LOGOUT_START })
  try {
    removeToken()
    yield put({ type: LOGOUT_SUCCESS })
    yield put(push('/login'))
  } catch (error) {
    yield put({ type: LOGOUT_ERROR, payload: error })
  }
}

function* loginFetch({ payload }) {
  yield put({ type: LOGIN_START })
  try {
    const { user, token } = yield googleAuth(payload)
    yield put({ type: LOGIN_SUCCESS, payload: { data: user, token } })
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error })
  }
}

export function* auth() {
  while (true) { //eslint-disable-line
    const { payload: { token } } = yield take(LOGIN_SUCCESS)
    setToken(token)
    yield put(push('/'))
  }
}

export default function* authSaga() {
  yield takeEvery(LOGOUT, logoutSaga)
  yield takeEvery(LOGIN, loginFetch)
  yield auth()
}
