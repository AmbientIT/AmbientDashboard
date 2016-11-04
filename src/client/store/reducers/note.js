import { note } from '../actions'

const initialState = {
  data: {},
  filter: {},
  isLoading: false,
  isSubmitting: false,
  count: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case note.constants.NOTE_FETCH_START:
      return {
        ...state,
        isLoading: true,
      }
    case note.constants.NOTE_FETCH_SUCCESS:
      return {
        count: action.payload.count,
        filter: state.filter,
        isLoading: false,
        data: {
          ...state.data,
          ...action.payload.data.entities.note,
        },
      }
    case note.constants.NOTE_FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case note.constants.NOTE_FETCH_ONE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.entities.note,
        },
      }
    case note.constants.NOTE_CREATE_START:
    case note.constants.NOTE_UPDATE_START:
      return {
        ...state,
        isSubmitting: true,
      }
    case note.constants.NOTE_CREATE_SUCCESS:
    case note.constants.NOTE_UPDATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        data: {
          ...state.data,
          ...action.payload.entities.note,
        },
      }
    case note.constants.NOTE_DELETE_SUCCESS:
      return {
        ...state,
        data: Object.keys(state.data).reduce((data, next) => {
          if (next !== action.payload.result) {
            data[next] = state.data[next]
          }
          return data
        }, {}),
      }
    case note.constants.NOTE_CREATE_ERROR:
    case note.constants.NOTE_UPDATE_ERROR:
      return {
        ...state,
        isSubmitting: false,
      }
    default:
      return state //eslint-disable-line
  }
}
