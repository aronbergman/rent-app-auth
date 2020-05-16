import React, {Component} from 'react';
import {COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING, PRIVATE_MESSAGE} from '../../../constants/MessageEvents'
import SideBar from './SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import {getUserChatsApi} from "../../../redux/thunks/chats.thunks";
import {connect} from "react-redux";

class ChatContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [
                {
                    id: '3b772120-7d24-4693-8f3a-2d1dc3319199',
                    name: 'aronbergman&max',
                    messages: [],
                    users: ['aronbergman', 'max'],
                    typingUsers: []
                },
                {
                    id: '3b772120-7d24-4693-8f3a-2d1dc3319198',
                    name: 'aronbergman&irina',
                    messages: [],
                    users: ['aronbergman', 'irina'],
                    typingUsers: []
                }
            ],
            activeChat: null
        };
    }

    // user = JSON.parse(localStorage.getItem('user'))

    componentDidMount() {
        const {socket} = this.props
        this.initSocket(socket)

        // this.props.getUserChats(this.user).then(data => {
        //     this.setState({chats: data})
        //
        // })
    }

    initSocket(socket) {
        socket.emit(COMMUNITY_CHAT, this.addChat)
        socket.on(PRIVATE_MESSAGE, this.addChat)
        socket.on('connect', () => {
            socket.emit(COMMUNITY_CHAT, this.addChat)
        })

        this.state.chats.map(chat => {
            chat.users.find((name) => {
                if (name !== this.props.user.name) this.sendOpenPrivateMessage(name)
            })
        })
    }

    sendOpenPrivateMessage = (reciever) => {
        const {socket, user} = this.props
        console.log('sendOpenPrivateMessage reciever', reciever)
        socket.emit(PRIVATE_MESSAGE, {reciever, sender: user.name})
    }

    /*
    *	Reset the chat back to only the chat passed in.
    * 	@param chat {Chat}
    */
    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    /*
    *	Adds chat to the chat container, if reset is true removes all chats
    *	and sets that chat to the main chat.
    *	Sets the message and typing socket events for the chat.
    *
    *	@param chat {Chat} the chat to be added.
    *	@param reset {boolean} if true will set the chat as the only chat.
    */
    addChat = (chat, reset = false) => {
        const {socket} = this.props
        const {chats} = this.state

        const newChats = reset ? [chat] : [...chats, chat]
        this.setState({chats: newChats, activeChat: reset ? chat : this.state.activeChat})

        const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(typingEvent, this.updateTypingInChat(chat.id))
        socket.on(messageEvent, this.addMessageToChat(chat.id))
    }

    /*
    * 	Returns a function that will
    *	adds message to chat with the chatId passed in.
    *
    * 	@param chatId {number}
    */
    addMessageToChat = (chatId) => {
        return message => {
            const {chats} = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId)
                    chat.messages.push(message)
                return chat
            })

            this.setState({chats: newChats})
        }
    }

    /*
    *	Updates the typing of chat with id passed in.
    *	@param chatId {number}
    */
    updateTypingInChat = (chatId) => {
        return ({isTyping, user}) => {
            if (user !== this.props.user.name) {

                const {chats} = this.state

                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chat.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({chats: newChats})
            }
        }
    }

    /*
    *	Adds a message to the specified chat
    *	@param chatId {number}  The id of the chat to be added to.
    *	@param message {string} The message to be added to the chat.
    */
    sendMessage = (chatId, message) => {
        const {socket} = this.props
        socket.emit(MESSAGE_SENT, {chatId, message})
    }

    /*
    *	Sends typing status to server.
    *	chatId {number} the id of the chat being typed in.
    *	typing {boolean} If the user is typing still or not.
    */
    sendTyping = (chatId, isTyping) => {
        const {socket} = this.props
        socket.emit(TYPING, {chatId, isTyping})
    }

    setActiveChat = (activeChat) => {
        this.setState({activeChat})
    }

    render() {
        const {user, logout} = this.props
        const {chats, activeChat} = this.state
        console.log(chats)
        return (
            <div className="container">
                <SideBar
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                    onSendPrivateMessage={this.sendOpenPrivateMessage}
                />
                <div className="chat-room-container">
                    {
                        activeChat !== null ? (

                                <div className="chat-room">
                                    <ChatHeading name={activeChat.name}/>
                                    <Messages
                                        messages={activeChat.messages}
                                        user={user}
                                        typingUsers={activeChat.typingUsers}
                                    />
                                    <MessageInput
                                        sendMessage={
                                            (message) => {
                                                this.sendMessage(activeChat.id, message)
                                            }
                                        }
                                        sendTyping={
                                            (isTyping) => {
                                                this.sendTyping(activeChat.id, isTyping)
                                            }
                                        }
                                    />

                                </div>
                            ) :
                            <div className="chat-room choose">
                                <h3>Choose a chat!</h3>
                            </div>
                    }
                </div>

            </div>
        );
    }
}

export default ChatContainer