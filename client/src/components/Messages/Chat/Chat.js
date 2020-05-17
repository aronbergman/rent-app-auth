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
import {getUserChatsApi, getChatHisroty, setChatHisroty} from "../../../redux/thunks/chats.thunks";
import DefaultLayout from "../../Layouts/default.layout";

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [activeChat, setActiveChat] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5050/'

    useEffect(() => {
        const {room} = queryString.parse(props.location.search);

        props.getUserChatsApi(props.userData.id).then(data => {
            data.map(chat => {
                if (chat.room === room) {
                    const actChat = interlocutor(chat)
                    setActiveChat(actChat)
                }
            });
        })

        const name = props.userData.username
        if (room) {

            props.getChatHistory(room).then(roomMessages => {
                roomMessages.map(message => {
                    setMessages(messages => [...messages, {
                        text: message.message,
                        user: message.from,
                        id: message.id,
                        time: message.updatedAt
                    }]);
                })
            });
        }

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, props.location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", (data) => {
            // setUsers(users);
            console.log('roomData', data)
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        props.setChatHistory({
            room: room,
            message: message,
            from: props.userData.id
        })

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    messages.sort((a, b) => (a.id - b.id))

    console.log('activeChat', activeChat)

    const interlocutor = (chat) => {
        let user = '';
        (chat.fromUserId !== props.userData.id)
            ? user = chat.fromUserName
            : user = chat.toUserName;

        return {
            room: chat.room,
            name: user
        }
    }

    return (
        <DefaultLayout>
            <div className="outerContainer">
                <UserChats chats={props.userChats} interlocutor={interlocutor}/>
                <div className="container">
                    <InfoBar name={activeChat.name}/>
                    <Messages messages={messages} myName={props.userData.id}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
            </div>
        </DefaultLayout>
    );
}

const mapState = state => ({
    userData: state.user.userData,
    userChats: state.chat.userChats,
    activeChatMessage: state.chat.chatMessages
})

const mapDispatch = dispatch => ({
    getUserChatsApi: id => dispatch(getUserChatsApi({id})),
    getChatHistory: room => dispatch(getChatHisroty({room})),
    setChatHistory: data => dispatch(setChatHisroty(data))
})

export default connect(mapState, mapDispatch)(withAuth(Chat, USER));
