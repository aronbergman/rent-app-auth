import React from 'react';

import './UserChats.scss';
import {Link} from "react-router-dom";

const UserChats = ({chats, interlocutor}) => {

    return (<div className="textContainer">
        {chats ? <div>
            <div className="activeContainer">
                <h2>{chats.map(chat => {
                    const chatData = interlocutor(chat)
                    return (
                        <Link to={`/messages?room=${chatData.room}`}>{chatData.name}</Link>
                    )
                })}</h2>
            </div>
        </div> : null}
    </div>);
}

export default UserChats;