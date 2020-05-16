import React, {Component} from 'react';
import './styles.scss'
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../../constants/MessageEvents'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:5002"
export default class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.initSocket()
    }

    /*
    *	Connect to and initializes the socket.
    */
    initSocket = () => {
        const socket = io(socketUrl)

        socket.on('connect', () => {console.log("Connected")})

        this.setState({socket})

        console.log(this.props.user.username)

        socket.emit(VERIFY_USER, this.props.user.username, ({user, isUser}) => {

            if (isUser) {console.log('error', isUser)} else {
                /*
                 * 	Sets the user property in state
                 *	@param user {id:number, name:string}
                 */
                socket.emit(USER_CONNECTED, user);
                this.setState({user})
            }
        })
    }

    /*
    *	Sets the user property in state to null.
    */
    logout = () => {
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user: null})

    }

    render() {
        const {socket, user} = this.state
        console.log('user render', user)
        return (
            user ? <div className="container" id='message'>
                <ChatContainer socket={socket} user={user} logout={this.logout}/>
            </div> : null
        );
    }
}
