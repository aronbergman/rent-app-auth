import React from 'react';
import ReactEmoji from 'react-emoji';
import moment from 'moment';
import './Message.scss';
import {dateParser} from "../../../../helpers/dateParser";
moment.locale('ru');

const Message = ({ message: { message, from, updatedAt }, myName }) => {
  let isSentByCurrentUser = false;

  if(from === myName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{dateParser(updatedAt)}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
            </div>
            <p className="sentText pl-10 ">{dateParser(updatedAt)}</p>
          </div>
        )
  );
}

export default Message;