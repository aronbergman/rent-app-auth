import React from 'react';
import ReactEmoji from 'react-emoji';
import moment from 'moment';
import './Message.scss';
import {dateParser} from "../../../../helpers/dateParser";
moment.locale('ru');

const Message = ({ message: { text, user, time }, myName }) => {
  let isSentByCurrentUser = false;

  if(user === myName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{dateParser(time)}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{dateParser(time)}</p>
          </div>
        )
  );
}

export default Message;