import {combineReducers} from 'redux'
import rent from './reducers/rent.reducer'
import dating from './reducers/dating.reducer'
import news from './reducers/news.reducer'
import user from './reducers/user.reducer'

export default combineReducers({
    rent,
    dating,
    news,
    user
});
