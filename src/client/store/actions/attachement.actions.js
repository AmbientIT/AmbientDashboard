export const ADD_ATTACHEMENT = 'ADD_ATTACHEMENT'
export const UPLOAD_START = 'UPLOAD_START'
export const UPLOAD_CANCEL = 'UPLOAD_CANCEL'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const REMOVE_ATTACHEMENT = 'REMOVE_ATTACHEMENT'

export const addAttachements = files => dispatch => {
  dispatch({
    type: ADD_ATTACHEMENT,
    payload: files,
  })
}


export const removeAttachement = file => dispatch => {
  dispatch({
    type: REMOVE_ATTACHEMENT,
    payload: file,
  })
}
