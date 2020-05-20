import axios from "axios";
import {
    API_FETCH_CREATE_NEW_ROOM, API_FETCH_GET_CHAT_HISTORY,
    API_FETCH_SET_CHAT_HISTORY, API_FETCH_USER_CHATS
} from "../../constants/api.constants";
import {
    getLoaded,
    getUserChats,
    setActiveChatMessages, setCounter,
    setSocketMessage
} from "../reducers/chat.reducer";
import {FINISH, START} from "../../constants/others.constants";
import authHeader from "../../services/auth-header";
const user = JSON.parse(localStorage.getItem('user'))

export const getUserChatsApi = data => async dispatch => {
    dispatch(getLoaded(START))
    const response = await axios.post(API_FETCH_USER_CHATS, data, {headers: authHeader()})

    let counter = 0

    response.data.map(chat => {
        if (chat.lastSendUserId !== user.id) {
            counter = counter + chat.notReadCounter
        }
    })

    dispatch(getUserChats({
        chats: response.data,
        counter
    }));
    dispatch(getLoaded(FINISH))
    return response.data
}

export const setMessageSocketAction = data => async dispatch => {
    dispatch(setSocketMessage(data));
}

export const setCounterFromSocket = data => async dispatch => {
    dispatch(setCounter(data));
}

export const setActiveChatHistory = data => async dispatch => {
    dispatch(getLoaded(START))
    const response = await axios.post(API_FETCH_GET_CHAT_HISTORY, data, {headers: authHeader()})
    dispatch(setActiveChatMessages({
        ...data,
        messages: response.data,
        fetchAuthor: user.id
    }));
    dispatch(getLoaded(FINISH))
    return response.data;
}

export const setChatHisroty = data => async dispatch => {
    const response = await axios.post(API_FETCH_SET_CHAT_HISTORY, data, {headers: authHeader()})
    return response.data;
}

export const handlerStartNewRoom = data => async dispatch => {
    let room = null
    await axios.post(API_FETCH_USER_CHATS, {
        id: data.senderMessage.id
    }, {headers: authHeader()})
        .then(async responseUserChats => {
            responseUserChats.data.map(chat => {
                if (chat.fromUserId === data.senderMessage.id && chat.toUserId === data.thisAd.authorId ||
                    chat.fromUserId === data.thisAd.authorId && chat.toUserId === data.senderMessage.id) {
                    // Чат найден, вернул номер комнаты
                    room = {room: chat.room}
                }
            })

            if (!room || !responseUserChats.data.length) {
                await axios.post(API_FETCH_CREATE_NEW_ROOM, {
                    fromId: data.senderMessage.id,
                    toId: data.thisAd.authorId
                }, {headers: authHeader()}).then(res => {
                    // Создан чат, возвращаю номер комнаты
                    room = res.data
                })
            }
        })
    return room
}