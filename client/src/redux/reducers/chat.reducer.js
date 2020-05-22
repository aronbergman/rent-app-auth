import {createSlice} from '@reduxjs/toolkit'
import {START} from "../../constants/others.constants";

const TODOS_REDUCER_NAME = 'chat'

const chatSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        loaded: false,
        userChats: null,
        allCounterNotRead: null,
        activeChat: {
            messages: []
        },
        // chatMessages: null
    },
    reducers: {
        getLoaded(state, action) {
            state.loaded = action.payload !== START
        },
        getUserChats(state, action) {
            state.userChats = action.payload.chats
            state.allCounterNotRead = action.payload.counter
            // state.chatMessages = null
        },
        // getChatMessages(state,action) {
        //     state.chatMessages = action.payload
        // },
        setSocketMessage(state, action) {
            state.activeChat.messages = [
                ...state.activeChat.messages,
                action.payload
            ]
        },
        setActiveChatMessages(state, action) {
            const data = state.userChats.filter(i => i.room === action.payload.room)
            let otherChats = state.userChats
            const index = state.userChats.findIndex(i => i.room === action.payload.room);
            if (index !== -1) {
                otherChats.splice(index, 1);
            }

            state.activeChat = {
                messages: action.payload.messages,
                ...data[0]
            }

            if (data[0]) {
                if (data[0].lastSendUserId !== action.payload.fetchAuthor) {
                    state.allCounterNotRead = state.allCounterNotRead - data[0].notReadCounter
                }
            }

            state.userChats = [
                ...otherChats,
                {
                    ...data[0],
                    notReadCounter: null
                }
            ]
        },
        setCounter(state, action) {
            const data = state.userChats.filter(i => i.room === action.payload.room)
            let otherChats = state.userChats
            const index = state.userChats.findIndex(i => i.room === action.payload.room);
            if (index !== -1) {
                otherChats.splice(index, 1);
            }

            state.allCounterNotRead = state.allCounterNotRead + 1

            state.userChats = [
                ...otherChats,
                {
                    ...data[0],
                    notReadCounter: data[0].notReadCounter + 1
                }
            ]
        },
        setNotification(state, action) {
            const data = state.userChats.filter(i => i.room === action.payload.room)
            let otherChats = state.userChats
            const index = state.userChats.findIndex(i => i.room === action.payload.room);
            if (index !== -1) {
                otherChats.splice(index, 1);
            }

            state.userChats = [
                ...otherChats,
                {
                    ...data[0],
                    isOnline: action.payload.isOnline
                }
            ]
        },
        setFirstUsersStatus(state, action) {

        }
    }
})

export const {
    getLoaded,
    getUserChats,
    setSocketMessage,
    setActiveChatMessages,
    setCounter,
    setNotification,
    setFirstUsersStatus
} = chatSlice.actions

export default chatSlice.reducer
