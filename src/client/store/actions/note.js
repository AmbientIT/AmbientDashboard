import noteDao from '../_services/noteDao';

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const VALIDATE_NOTE = 'VALIDATE_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';
export const LOADING_NOTE = 'LOADING_NOTE';
export const FETCH_ONE_NOTE = 'FETCH_ONE_NOTE';

export const addNote = (note) => {
  note.date = note.date.getTime();
  return dispatch => {
    dispatch({ type: LOADING_NOTE });
    noteDao.create(note)
      .then(createdNote => {
        dispatch({
          type: ADD_NOTE,
          payload: createdNote,
        });
      });
  };
};

export const fetchNotes = () => {
  return dispatch => {
    dispatch({ type: LOADING_NOTE });
    return noteDao.findAll({ include: ['User'] })
      .then(notes => dispatch({
        type: FETCH_NOTES,
        payload: notes,
      }));
  };
};

export const fetchOne = (id) => {
  return (dispatch, getState) => {
    const existingNote = getState().notes.list.find(n => n.id === id);
    return !!existingNote
      ? Promise.resolve(existingNote)
      : noteDao.findOne(
        {
          include: ['User'],
          where: { id },
        }
      )
      .then(note => dispatch({
        type: FETCH_ONE_NOTE,
        payload: note,
      }));
  };
};

export const removeNote = (note) => {
  return dispatch => {
    // dispatch({ type: LOADING_NOTE });
    return noteDao.destroy(note.id)
      .then(() => dispatch({
        type: REMOVE_NOTE,
        payload: note.id,
      }));
  };
};

export const updateNote = (note) => {
  note.date = note.date.getTime();
  return dispatch => {
    dispatch({ type: LOADING_NOTE });
    return noteDao.update(note)
      .then(updatedNote => dispatch({
        type: UPDATE_NOTE,
        payload: updatedNote,
      }));
  };
};
