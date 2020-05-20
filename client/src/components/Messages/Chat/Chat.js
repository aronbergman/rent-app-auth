import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import UserChats from '../UserChats/UserChats';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.scss';
import {USER} from "../../../constants/roles.constants";
import withAuth from "../../../HOC/withAuth";
import {connect} from "react-redux";
import {getUserChatsApi, setActiveChatHistory, setChatHisroty} from "../../../redux/thunks/chats.thunks";
import DefaultLayout from "../../Layouts/default.layout";
import ChatNotSelect from "../ChatNotSelect/ChatNotSelect";
import baseUrl from "../../../baseurl";

// Когда страница открыта в первый раз, показать все списки пользователя и загрушку на месте чата.
// После выбора определенного чата, записать активный чат в стор и использовать нужный сокет
// При начале чата показать историю и сам чат

let socket;

const Chat = (props) => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    const ENDPOINT = baseUrl()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const {room} = queryString.parse(props.location.search);
        const user = JSON.parse(localStorage.getItem('user'))
        socket = io(ENDPOINT);
        setRoom(room);
        if (room) {
            props.setActiveChatHistory({room, user})
            //     .then(roomMessages => {
            //     roomMessages.map(message => {
            //         setMessages(messages => [...messages, {
            //             text: message.message,
            //             user: message.from,
            //             id: message.id,
            //             time: message.updatedAt
            //         }]);
            //     })
            // });
        }

    }, [props.location.search]);

    useEffect(() => {
        socket.on('message', message => {
            console.log('message in client, finish!', message)
            // setMessages(messages => [...messages, message]);
            // console.log('messages', messages)
        });

        // socket.on("roomData", (data) => {
        //     // setUsers(users);
        //     console.log('roomData', data)
        // });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        // props.setChatHistory({
        //     room: room,
        //     message: message,
        //     from: +props.userData.id
        // })

        const {name} = interlocutor(props.activeChat, 'myName')

        if (message) {
            const time = Date.now();
            const data = {
                message,
                room: props.activeChat.room,
                name,
                from: +props.userData.id,
                updatedAt: time,
                id: time
            }
            socket.emit('sendMessage', data, () => {
                setMessage('')
                props.setChatHistory(data)
                //    Пушим в историю это сообщение
            });
        }
    }

    const activeChat = [...props.activeChat.messages].sort((a, b) => (a.id - b.id))
    const sortUserChats = props.userChats ? [...props.userChats].sort((a, b) => (a.id - b.id)) : null

    const interlocutor = (chat, whyNameParse) => {
        let user = '';
        if (whyNameParse !== 'myName') {
            (chat.fromUserId !== props.userData.id)
                ? user = chat.fromUserName
                : user = chat.toUserName;
        } else {
            (chat.toUserId !== props.userData.id)
                ? user = chat.fromUserName
                : user = chat.toUserName;
        }

        return {
            room: chat.room,
            name: user
        }
    }

    const notReadCounter = chat => {
        if (user.id !== chat.lastSendUserId) {
            return chat.notReadCounter
        }
        return null
    }

    if (props.socketMessage) {
        console.log('socketMessage', props.socketMessage.text)
    }

    return (
        <DefaultLayout>
            <div className="outerContainer">
                <UserChats chats={sortUserChats} interlocutor={interlocutor} counter={notReadCounter}/>
                {
                    props.activeChat.room
                        ? <div className="container">
                            <InfoBar activeChat={props.activeChat} interlocutor={interlocutor}/>
                            <Messages messages={activeChat} myName={props.userData.id}/>
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                        </div>
                        : <ChatNotSelect/>
                }
            </div>
        </DefaultLayout>
    );
}

const mapState = state => ({
    userData: state.user.userData,
    userChats: state.chat.userChats,
    socketMessage: state.chat.socketMessage,
    activeChat: state.chat.activeChat
})

const mapDispatch = dispatch => ({
    getUserChatsApi: id => dispatch(getUserChatsApi({id})),
    setActiveChatHistory: data => dispatch(setActiveChatHistory(data)),
    setChatHistory: data => dispatch(setChatHisroty(data))
})

export default connect(mapState, mapDispatch)(withAuth(Chat, USER));
