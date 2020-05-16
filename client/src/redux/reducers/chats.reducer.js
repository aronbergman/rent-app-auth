import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const TODOS_REDUCER_NAME = 'chats'

const chatsSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        loaded: false,
        userChats: null
    },
    reducers: {
        getLoaded(state, action) {
            state.loaded = action.payload !== START
        },
        getUserChats(state, action) {
            state.userChats = action.payload
        }
    }
})

export const {
    getLoaded,
    getUserChats
} = chatsSlice.actions

export default chatsSlice.reducer
