import { takeEvery } from 'redux-saga'
import { select } from 'redux-saga/effects'

export default function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log(action.type, 'state : ', state)
  })
}
