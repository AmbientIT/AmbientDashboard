import { LOGIN_FINISH } from '../actions/auth'
import { FETCH_NOTES, FETCH_ONE_NOTE, ADD_NOTE } from '../actions/note'

class User {
  constructor(id = Date.now(), name, email, avatar) {
    this.id = id
    this.name = name
    this.email = email
    this.avatar = avatar
  }
}

export default (state, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
    case FETCH_NOTES :
    case FETCH_ONE_NOTE :
    case ADD_NOTE :
      return new User(
        state.id,
        state.name,
        state.email,
        state.avatar,
       )
    default :
      return state
  }
}
