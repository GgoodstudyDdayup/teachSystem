import UserStateReducer from './UserStateReducer'
import { combineReducers } from 'redux'

const rootReduer = combineReducers({
    UserState: UserStateReducer
})
export default rootReduer
