import React, {useState} from 'react';
import {ADMIN} from "../../../../constants/roles.constants";
import withAuth from "../../../../HOC/withAuth";
import AdminLayout from "../../../Layouts/admin.layout";

import {Form, Input, Button, Select} from 'antd';
import {connect} from "react-redux";
import {createPostHandler, getImageHandler} from "../../../../redux/thunks/blog.thunks";

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const NewsCreator = props => {
    const [images, setImage] = useState('')

    const onFinish = values => {
        console.log('Success:', values, images);
        props.createNewPost({
            ...values,
            images
        }).then(() => props.history.push('/news'))
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onChangeHandler = event => {
        const data = new FormData()
        for (let i = 0; i < event.target.files.length; i++) {
            data.append('file', event.target.files[i])
        }
        props.getPostImage(data).then(res => {
            console.log('Изображения', res)
            setImage(res)
        })
    }

    return (
        <AdminLayout {...props}>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{required: true, message: 'Обязательное поле'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="category"
                >
                    <Select style={{width: 120}}>
                        <Option value="1">ПУТЕШЕСТВИЯ</Option>
                        <Option value="2">ПСИХОЛОГИЯ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Содержимое"
                    name="content"
                    rules={[{required: true, message: 'Обязательное поле'}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item label="Изображение">
                    <div className="custom-file">
                        <input type="file"
                               className="custom-file-input"
                               multiple
                               lang="ru"
                               onChange={onChangeHandler}>
                        </input>
                        <label className="custom-file-label" htmlFor="validatedCustomFile">
                            Загрузи изображение (.jpg, .png)</label>
                    </div>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </AdminLayout>
    );
};

const mapDispatch = dispatch => ({
    createNewPost: data => dispatch(createPostHandler(data)),
    getPostImage: data => dispatch(getImageHandler(data))
})

export default withAuth(connect(null, mapDispatch)(NewsCreator), ADMIN);