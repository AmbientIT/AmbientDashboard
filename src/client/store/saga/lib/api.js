import { put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import apiFetch from '../../models/apiFetch'
import { persistLocally } from './localPersistence'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* retryCall(action, schema) {
  for (let i = 0; i < 5; i++) { //eslint-disable-line
    try {
      return yield call(apiFetch, action.payload, schema)
    } catch (err) {
      yield put({
        type: `${action.type}_RETRY`,
      })
      if (i < 5) {
        yield call(delay, 2000)
      }
    }
  }
  // attempts failed after 5x2secs
  throw new Error('API request failed')
}

export const getApiFetchWrapper = ({ schema = null, redirect, retry, persist = persistLocally }) =>
  function* apiFetchWrapper(action) {
    yield put({ type: `${action.type}_START` })
    try {
      let payload
      if (retry) {
        payload = yield* retryCall(action, schema)
      } else {
        payload = yield call(apiFetch, action.payload, schema)
      }
      if (persist) {
        yield persist(payload.entities || payload.data.entities)
      }
      yield put({ type: `${action.type}_SUCCESS`, payload })
      if (redirect) {
        yield put(push(typeof redirect === 'string' ? redirect : redirect(payload)))
      }
    } catch (error) {
      console.error(error)
      yield put({ type: `${action.type}_ERROR`, error })
    }
  }
