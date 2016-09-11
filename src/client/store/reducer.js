import { combineReducers } from 'redux'
import notes from './reducers/notes'
import users from './reducers/users'
import auth from './reducers/auth'

// requires and returns all modules that match
export default combineReducers({
  notes,
  users,
  auth,
});
