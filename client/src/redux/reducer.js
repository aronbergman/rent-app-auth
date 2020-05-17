import {combineReducers} from 'redux'
import rent from './reducers/rent.reducer'
import dating from './reducers/dating.reducer'
import news from './reducers/news.reducer'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
import chat from './reducers/chat.reducer'

export default combineReducers({
    app,
    rent,
    dating,
    news,
    user,
    chat
});
