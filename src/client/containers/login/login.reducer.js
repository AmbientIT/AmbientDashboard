import actions from 'store/actions' // eslint-disable-line
import user from './user' // eslint-disable-line
const { LOGIN_LOADING, LOGIN_FINISH } = actions.login

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
      return {
        isLoading: false,
        loggedUser: user(action.payload, action),
      }
    case LOGIN_LOADING :
      state.isLoading = true
      return state
    default :
      return state
  }
}
