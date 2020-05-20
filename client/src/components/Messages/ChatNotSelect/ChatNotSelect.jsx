import React from 'react';
import classes from './styles.module.scss'
import {Empty} from "antd";

const ChatNotSelect = () => <Empty
    className={classes.ChatNotSelect}
    description={"Диалог не выбран"} />;

export default ChatNotSelect;
