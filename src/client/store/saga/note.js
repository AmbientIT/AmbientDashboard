import { takeEvery, takeLatest, throttle } from 'redux-saga'
import { note } from '../actions'
import { noteSchemaArray, noteSchema } from '../models'
import { getApiFetchWrapper } from './lib/api'
import { removeLocally } from './lib/localPersistence'

const redirectToDetail = payload => `/note/edit/${payload.result}`

export default function* noteSaga() {
  yield takeEvery(note.constants.NOTE_FETCH, getApiFetchWrapper({ schema: noteSchemaArray }))
  yield throttle(2000, note.constants.NOTE_FETCH_ONE, getApiFetchWrapper({ schema: noteSchema }))
  yield takeLatest(note.constants.NOTE_CREATE, getApiFetchWrapper({ schema: noteSchema, redirect: redirectToDetail, retry: true }))
  yield takeLatest(note.constants.NOTE_UPDATE, getApiFetchWrapper({ schema: noteSchema, redirect: '/note', retry: true }))
  yield takeLatest(note.constants.NOTE_DELETE, getApiFetchWrapper({ schema: noteSchema, persist: removeLocally }))
}
