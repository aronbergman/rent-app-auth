import React from 'react';
import {connect} from 'react-redux'
import {Form, Input, Select, InputNumber, Switch, Radio, Button, Checkbox, Row, Col, Upload} from 'antd';
import {createAd} from "../../redux/thunks/rent-ad.thunks";
import createTitleAd from "../../helpers/createTitleAd";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";

const {Option} = Select;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const user = JSON.parse(localStorage.getItem('user'))

const CreateAdForm = props => {
    const onFinish = values => {
        const title = createTitleAd(values)
        props.createAd({
            ...values,
            userId: user ? user.id : 0,
            title
        })
    };

    return (
        <div>
            <h2>Создать объявление для раздела Аренда</h2>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    ['input-number']: 3,
                    ['checkbox-group']: ['A', 'B'],
                    rate: 3.5,
                }}
            >
                <Form.Item name="username" label="Telegram" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{type: 'email'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="typeOfApplicant" label="Тебе нужно"
                           rules={[{required: true, message: 'Пожалуйста, выберите цель!'}]}>
                    <Radio.Group>
                        <Radio.Button value="0">Снять</Radio.Button>
                        <Radio.Button value="1">Сдать</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="typeOfObject" label="Что именно"
                           rules={[{required: true, message: 'Пожалуйста, выберите вид объекта!'}]}>
                    <Radio.Group>
                        <Radio.Button value="flat">Квартиру</Radio.Button>
                        <Radio.Button value="room">Комнату</Radio.Button>
                        <Radio.Button value="bed">Спальное место</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="sizeOfObject" label="Комнат в квартире">
                    <Radio.Group>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                        <Radio.Button value="4">4</Radio.Button>
                        <Radio.Button value="5">5</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="renovation"
                    label="Ремонт"
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, выберите вид отделки объекта!'}]}
                >

                    <Select placeholder="Совок или евро?">
                        <Option value="0">White box</Option>
                        <Option value="1">Совок стайл</Option>
                        <Option value="2">Косметический</Option>
                        <Option value="3">Евроремонт</Option>
                        <Option value="4">Любой, не важно</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="city"
                    label="Город"
                    hasFeedback
                    rules={[{required: true, message: 'Пожалуйста, выберите город!'}]}
                >
                    <Select placeholder="Выбери город">
                        <Option value="77">Москва</Option>
                        <Option value="78">Санкт-Петербург</Option>
                        <Option value="66">Екатеринбург</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="metroStations"
                    label="Расположение"
                >
                    <Select mode="multiple" placeholder="Пожалуйста, выберите одну или несколько станций метро">
                        <Option value="red">Багратионовская</Option>
                        <Option value="darkblue">Беляево</Option>
                        <Option value="gray">Пражская</Option>
                        <Option value="gray">Отрадное</Option>
                        <Option value="gray">Бульвар Рокоссовского</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="distanceMetro" label="Расстояние до метро">
                    <Radio.Group>
                        <Radio value="1">100 метров</Radio>
                        <Radio value="2">300 метров</Radio>
                        <Radio value="3">500 метров</Radio>
                        <Radio value="4">1 км</Radio>
                        <Radio value="5">2 км</Radio>
                        <Radio value="6">более 2 км</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="description" label="Дополнительные сведения">
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item label="Стоимость">
                    <Form.Item name="price" noStyle>
                        <InputNumber min={5000} max={60000}/>
                    </Form.Item>
                    <span className="ant-form-text"> рублей в месяц</span>
                </Form.Item>

                <Form.Item label="Этаж">
                    <Form.Item name="floor" noStyle>
                        <InputNumber min={1} max={50}/>
                    </Form.Item>
                </Form.Item>

                <Form.Item name="infrastructure" label="Рядом есть">
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="A" style={{lineHeight: '32px'}}>
                                    Спортзал, качалка
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="B" style={{lineHeight: '32px'}}>
                                    Продукты и тд
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="C" style={{lineHeight: '32px'}}>
                                    Торговый центр
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="D" style={{lineHeight: '32px'}}>
                                    Парк
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="E" style={{lineHeight: '32px'}}>
                                    Футбольное поле
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="F" style={{lineHeight: '32px'}}>
                                    Тихое место
                                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="deposit" label="Есть депозит" valuePropName="checked">
                    <Switch/>
                </Form.Item>

                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="http://localhost:8080/upload-profile-pic">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapDispatch = dispatch => ({
    createAd: data => dispatch(createAd(data))
})

export default connect(null, mapDispatch)(CreateAdForm);