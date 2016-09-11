export const ADD_ATTACHEMENTS = 'ADD_ATTACHEMENTS';
export const UPLOAD_START = 'UPLOAD_START';
export const UPLOAD_CANCEL = 'UPLOAD_CANCEL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const REMOVE_ATTACHEMENT = 'REMOVE_ATTACHEMENT';

export const addAttachements = (files) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ATTACHEMENTS,
      payload: files,
    });
  };
};

export const removeAttachement = (file) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ATTACHEMENT,
      payload: file,
    });
  };
};
