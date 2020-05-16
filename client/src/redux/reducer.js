import {combineReducers} from 'redux'
import rent from './reducers/rent.reducer'
import dating from './reducers/dating.reducer'
import news from './reducers/news.reducer'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
import chats from './reducers/chats.reducer'

export default combineReducers({
    app,
    rent,
    dating,
    news,
    user,
    chats
});
