import React from 'react';

import './InfoBar.scss';

const InfoBar = ({activeChat, interlocutor}) => {
    console.log('activeChat', activeChat)
    const {name} = interlocutor(activeChat, 'hisName')
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h3>{name}</h3>
            </div>
            <div className="rightInnerContainer">
                {/*<a href="/"><img src={closeIcon} alt="close icon" /></a>*/}
            </div>
        </div>
    );
}

export default InfoBar;