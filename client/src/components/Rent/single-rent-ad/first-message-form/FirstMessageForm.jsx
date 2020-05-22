import React from 'react';
import {Modal, Input} from "antd";
import {connect} from "react-redux";
import {setChatHisroty} from "../../../../redux/thunks/chats.thunks";

class FirstMessageForm extends React.Component {
    state = {
        message: '',
        title: `#${this.props.data.ad.id} – ${this.props.data.ad.title} за ${this.props.data.ad.price}₽. \n`
    }

    handleCancel = () => {
        this.props.setCreateMessageForm(prevState => ({
            ...prevState,
            visible: false
        }))
}

    handleOk = () => {
        const {room, fromUserId} = this.props.data
        const {title, message} = this.state

        const data = {
            room,
            message: title + message,
            from: fromUserId,
        }

        this.props.setChatHistory(data)
        this.handleCancel()
    };

    render() {
        return (
            <Modal
                title={`Диалог с ${this.props.data.ad.name}`}
                visible={this.props.data.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>{this.state.title}</p>
                <Input.TextArea
                    rows={4}
                    defaultValue={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                />
            </Modal>
        );
    }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
    setChatHistory: data => dispatch(setChatHisroty(data))
})

export default connect(null, mapDispatch)(FirstMessageForm);
