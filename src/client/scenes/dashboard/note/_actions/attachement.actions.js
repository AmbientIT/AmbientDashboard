import { uploadFile } from './lib/uploadHelpers'

export const ADD_ATTACHEMENT = 'ADD_ATTACHEMENT'
export const UPLOAD_START = 'UPLOAD_START'
export const UPLOAD_ERROR = 'UPLOAD_ERROR'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const REMOVE_ATTACHEMENT = 'REMOVE_ATTACHEMENT'

export const uploadAttachement = file => async dispatch => {
  try {
    dispatch({ type: UPLOAD_START })
    const fileData = await uploadFile({
      file,
      url: '/upload/attachement',
      onProgress(progress) {
        console.log(progress)
      },
    })
    dispatch({
      type: UPLOAD_SUCCESS,
      payload: fileData,
    })
  } catch (err) {
    dispatch({
      type: UPLOAD_ERROR,
      payload: err,
    })
  }
}

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
