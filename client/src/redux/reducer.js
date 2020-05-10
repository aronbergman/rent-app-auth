import {combineReducers} from 'redux'
import rent from './reducers/rent.reducer'
import dating from './reducers/dating.reducer'

export default combineReducers({
    rent,
    dating
});
