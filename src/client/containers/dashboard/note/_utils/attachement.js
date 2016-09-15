import actions from 'store/actions' //eslint-disable-line

const {
  ADD_ATTACHEMENTS,
  REMOVE_ATTACHEMENT,
} = actions.notes

class Attachement {
  constructor(
    id,
    name,
    type,
    url,
    size,
    noteId,
    isUploaded,
  ) {
    this.id = id || Date.now()
    this.name = name
    this.type = type
    this.url = url
    this.noteId = noteId
    this.isUploaded = isUploaded
  }
}

export default (state, action) => {
  switch (action.type) {
    case ADD_ATTACHEMENTS :
      return [
        ...state,
        ...action.payload
          .map(f => new Attachement(f.id, f.name, f.type, f.preview, f.size, f.noteId, false)),
      ]
    case REMOVE_ATTACHEMENT :
      return state.filter(f => f.name !== action.payload.name)
    default:
      return state
  }
}
