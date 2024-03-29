import axios from "axios";
import {
    API_FETCH_CREATE_NEW_ROOM, API_FETCH_GET_CHAT_HISTORY,
    API_FETCH_SET_CHAT_HISTORY, API_FETCH_USER_CHATS, API_FETCH_USER_DISCONNECT
} from "../../constants/api.constants";
import {
    getLoaded, getUserChats, setActiveChatMessages, setChatMessages,
    setCounter, setNotification, setSocketMessage
} from "../reducers/chat.reducer";
import {FINISH, START} from "../../constants/others.constants";
import authHeader from "../../services/auth-header";

const user = JSON.parse(localStorage.getItem('user'))

export const getUserChatsApi = data => async dispatch => {
    dispatch(getLoaded(START))
    const response = await axios.post(API_FETCH_USER_CHATS, data, {headers: authHeader()})
    const {chats, usersStatus} = response.data
    let counter = 0

    response.data.chats.map(chat => {
        if (chat.lastSendUserId !== user.id) {
            counter = counter + chat.notReadCounter
        }
    })

    const chatsAndStatus = []

    for (let i = 0; i < chats.length; i++) {
        let interlocutor = 0;
        if (chats[i].fromUserId === user.id) {
            interlocutor = chats[i].toUserId
        } else {
            interlocutor = chats[i].fromUserId
        }

        const interlocutorStatus = usersStatus.filter(i => i.userId === interlocutor)
        chatsAndStatus.push({...chats[i], isOnline: interlocutorStatus[0].isOnline})
    }

    dispatch(getUserChats({chats: chatsAndStatus, counter}));
    dispatch(getLoaded(FINISH))
    return chatsAndStatus
}

export const setMessageSocketAction = data => async dispatch => {
    dispatch(setSocketMessage(data));
}

export const setCounterFromSocket = data => async dispatch => {
    dispatch(setCounter(data));
}

export const setStatusRoom = data => async dispatch => {
    dispatch(setNotification(data));
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
    let startChat = null
    await axios.post(API_FETCH_USER_CHATS, {
        id: data.senderMessage.id
    }, {headers: authHeader()})
        .then(async responseUserChats => {
            responseUserChats.data.chats.map(chat => {
                if (chat.fromUserId === data.senderMessage.id && chat.toUserId === data.thisAd.authorId ||
                    chat.fromUserId === data.thisAd.authorId && chat.toUserId === data.senderMessage.id) {
                    startChat = chat
                }
            })

            if (!startChat || !responseUserChats.data.chats.length) {
                await axios.post(API_FETCH_CREATE_NEW_ROOM, {
                    fromId: data.senderMessage.id,
                    toId: data.thisAd.authorId
                }, {headers: authHeader()}).then(res => {
                    startChat = res.data
                })
            }
        })
    return startChat
}