import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.scss';

const Messages = ({messages, myName}) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} myName={myName}/></div>)}
    </ScrollToBottom>
);

export default Messages;