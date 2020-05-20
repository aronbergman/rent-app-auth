import React from 'react';

import classes from './styles.module.scss';
import {Link} from "react-router-dom";
import {Badge} from "antd";

const UserChats = ({chats, interlocutor, counter}) => {

    return (<div className={classes.UserChats}>
        {chats ? chats.map(chat => {
            const chatData = interlocutor(chat, 'hisName')
            const notRead = counter(chat)
            return (
                <Link to={`/messages?room=${chatData.room}`}>
                    <div className={classes.UserChat}>
                        {chatData.name}
                        {!!notRead ?  <Badge count={notRead} /> : null}
                    </div>
                </Link>
            )
        }) : null}
    </div>);
}

export default UserChats;