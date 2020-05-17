import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const TODOS_REDUCER_NAME = 'chat'

const chatSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        loaded: false,
        userChats: null,
        chatMessages: null
    },
    reducers: {
        getLoaded(state, action) {
            state.loaded = action.payload !== START
        },
        getUserChats(state, action) {
            state.userChats = action.payload
            state.chatMessages = null
        },
        getChatMessages(state,action) {
            state.chatMessages = action.payload
        }
    }
})

export const {
    getLoaded,
    getUserChats,
    getChatMessages
} = chatSlice.actions

export default chatSlice.reducer
