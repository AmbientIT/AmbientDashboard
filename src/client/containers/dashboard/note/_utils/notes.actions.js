export const ADD_NOTE = 'ADD_NOTE'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const VALIDATE_NOTE = 'VALIDATE_NOTE'
export const FETCH_NOTES = 'FETCH_NOTES'
export const LOADING_NOTE = 'LOADING_NOTE'
export const FETCH_ONE_NOTE = 'FETCH_ONE_NOTE'

export const ADD_ATTACHEMENTS = 'ADD_ATTACHEMENTS'
export const UPLOAD_START = 'UPLOAD_START'
export const UPLOAD_CANCEL = 'UPLOAD_CANCEL'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const REMOVE_ATTACHEMENT = 'REMOVE_ATTACHEMENT'

export const removeNote = id => {
  return {
    type: REMOVE_NOTE,
    payload: id,
  }
}

export const updateNote = note => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  }
}

export const createNote = note => {
  return {
    type: ADD_NOTE,
    payload: note,
  }
}

export const addAttachements = files => dispatch => {
  dispatch({
    type: ADD_ATTACHEMENTS,
    payload: files,
  })
}


export const removeAttachement = file => dispatch => {
  dispatch({
    type: REMOVE_ATTACHEMENT,
    payload: file,
  })
}
