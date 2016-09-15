import actions from 'store/actions' // eslint-disable-line

const { LOGIN_FINISH } = actions.login

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
