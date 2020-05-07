import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import rootReducer from './reducer'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'
// And use redux-batch as an example of adding enhancers
import {reduxBatch} from '@manaflair/redux-batch'

const middleware = [...getDefaultMiddleware(), logger]

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch]
})

export default store