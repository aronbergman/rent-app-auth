import React from 'react';
import {connect} from 'react-redux'
import {Form, Input, Select, InputNumber, Switch, Radio, Button, Checkbox, Row, Col} from 'antd';
import {
    createAd,
    handlerTypeOfApplicant, isLoadedTrue, thisUserData
} from '../../redux/thunks/rent-ad.thunks';
import createTitleAd from '../../helpers/createTitleAd';
import classes from './styles.module.scss'
import Header from "../Header/Header.component";
import {
    CITY_66,
    CITY_77, CITY_78,
    DISTANCE_TO_METRO_1,
    DISTANCE_TO_METRO_2,
    DISTANCE_TO_METRO_3,
    DISTANCE_TO_METRO_4,
    DISTANCE_TO_METRO_5,
    DISTANCE_TO_METRO_6,
    INFRASTRUCTURE_A,
    INFRASTRUCTURE_B,
    INFRASTRUCTURE_C,
    INFRASTRUCTURE_D,
    INFRASTRUCTURE_E,
    INFRASTRUCTURE_F, RENOVATION_0, RENOVATION_1, RENOVATION_2, RENOVATION_3, RENOVATION_4
} from "../../helpers/rentDataParsers";
import DefaultLayout from "../Layouts/default.layout";
import {handlerCityForLoadingMetro, handlerLoadFiles} from "../../redux/thunks/app.thunks";
import Loader from "../Loader/Loader";
import {Cities} from '../../helpers/createCitiesList'

import io from "socket.io-client";
import baseUrl from "../../baseurl";
let socket;

const {Option} = Select;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

class CreateAdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: [],
            loaded: 0,
            loadedFiles: []
        }
    }

    cityHandler = e => this.props.cityHandler(e)
    typeOfApplicantHandler = e => this.props.typeOfApplicantHandler(e.target.value)

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
       if (user) {
           this.props.thisUser(user.id)
       } else {
           this.props.isLoaded()
       }
        const ENDPOINT = baseUrl()
        socket = io(ENDPOINT);
    }

    render() {


        const onFinish = values => {
            const title = createTitleAd(values)
            console.log(values)

            const data = {
                ...values,
                userId: this.props.userData ? this.props.userData.id : 0,
                name: this.props.userData ? this.props.userData.name : values.name,
                username: this.props.userData ? this.props.userData.username : values.username,
                email: this.props.userData ? this.props.userData.email : values.email,
                title,
                images: this.props.files
            }

            this.props.createAd(data).then(newAd => {
                socket.emit('newRentAd', newAd);
                this.props.history.push('/rent')
            })
        };

        const onChangeHandler = event => {
            const data = new FormData()
            for (let i = 0; i < event.target.files.length; i++) {
                data.append('file', event.target.files[i])
            }
            this.props.loadFiles(data)
        }

        return (
            this.props.loaded ? <DefaultLayout>
                <Header>
                    <h2>Создать объявление</h2>
                </Header>
                <Form
                    className={classes.Content}
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        ['input-number']: 3,
                        ['checkbox-group']: ['A', 'B'],
                        rate: 3.5,
                    }}
                >
                    {!this.props.userData ? <>
                        <Form.Item name="username" label="Ник или номер Telegram">
                            <Input/>
                        </Form.Item>

                        <Form.Item name="name" label="Твоё имя" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{type: 'email', required: true}]}>
                            <Input/>
                        </Form.Item></> : null}
                    <Form.Item
                        name="typeOfApplicant" label="Ты хочешь"
                        rules={[{required: true, message: 'Пожалуйста, выберите цель!'}]}>
                        <Radio.Group
                            onChange={this.typeOfApplicantHandler}
                        >
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

                    <Form.Item
                        name="renovation"
                        label="Ремонт"
                        hasFeedback
                        rules={[{required: true, message: 'Пожалуйста, выберите вид отделки объекта!'}]}
                    >

                        <Select placeholder="Например, голые стены или евроремонт">
                            <Option value="0">{RENOVATION_0}</Option>
                            <Option value="1">{RENOVATION_1}</Option>
                            <Option value="2">{RENOVATION_2}</Option>
                            <Option value="3">{RENOVATION_3}</Option>
                            <Option value="4">{RENOVATION_4}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="city"
                        label="В каком городе"
                        hasFeedback
                        rules={[{required: true, message: 'Пожалуйста, выберите город!'}]}
                    >
                        <Select placeholder="Выбери город" onChange={this.cityHandler}>
                            {Cities.map(city => <Option value={`${city.regionCode}`}>{city.name}</Option>)}
                        </Select>
                    </Form.Item>

                    {!!this.props.stations.length && <Form.Item
                        name="metroStations"
                        rules={[{required: true, message: 'Пожалуйста, укажите сведения'}]}
                        label="Расположение"
                    >
                        <Select mode="multiple" placeholder="Пожалуйста, выберите одну или несколько станций метро">

                            {this.props.stations.map(station => <Option value={`${station.name}|${station.color}`}>
                                <div className={classes.MetroItem}>
                                    <div className={classes.MetroColor}
                                         style={{backgroundColor: `#${station.color}`}}>&nbsp;</div>
                                    {station.name}
                                </div>
                            </Option>)}

                        </Select>
                    </Form.Item>}

                    {!!this.props.stations.length && <Form.Item
                        name="distanceMetro"
                        rules={[{required: true, message: 'Пожалуйста, укажите сведения'}]}
                        label="Расстояние до метро"
                        hasFeedback
                    >
                        <Select placeholder={DISTANCE_TO_METRO_3}>
                            <Option value="1">{DISTANCE_TO_METRO_1}</Option>
                            <Option value="2">{DISTANCE_TO_METRO_2}</Option>
                            <Option value="3">{DISTANCE_TO_METRO_3}</Option>
                            <Option value="4">{DISTANCE_TO_METRO_4}</Option>
                            <Option value="5">{DISTANCE_TO_METRO_5}</Option>
                            <Option value="6">{DISTANCE_TO_METRO_6}</Option>
                        </Select>
                    </Form.Item>}

                    <Form.Item
                        rules={[{required: true, message: 'Пожалуйста, укажите сведения'}]}
                        name="description" label="Дополнительные сведения">
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item name="price" label="Стоимость"
                               rules={[{required: true, message: 'Пожалуйста, укажите стоимость'}]}>
                        <Input type="number" placeholder="Стоимость аренды в месяц"/>
                    </Form.Item>

                    {this.props.typeOfApplicant !== '0'
                        ? <Form.Item name="sizeOfObject"
                                     rules={[{
                                         required: true,
                                         message: 'Пожалуйста, укажите сведения о колличестве комнат'
                                     }]}
                                     label="Комнат в квартире">
                            <Radio.Group>
                                <Radio.Button value="1">1</Radio.Button>
                                <Radio.Button value="2">2</Radio.Button>
                                <Radio.Button value="3">3</Radio.Button>
                                <Radio.Button value="4">4</Radio.Button>
                                <Radio.Button value="5">5</Radio.Button>
                                <Radio.Button value="6">6</Radio.Button>
                            </Radio.Group>
                        </Form.Item> : null
                    }

                    {this.props.typeOfApplicant !== '0'
                        ? <Form.Item label="Этаж">
                            <Form.Item name="floor" noStyle>
                                <InputNumber min={1} max={50}/>
                            </Form.Item>
                        </Form.Item> : null
                    }

                    {this.props.typeOfApplicant !== '0'
                        ? <Form.Item name="deposit" label="Есть депозит" valuePropName="checked">
                            <Switch/>
                        </Form.Item> : null
                    }

                    <Form.Item name="infrastructure" label="Рядом есть">
                        <Checkbox.Group>
                            <Row>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="A" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_A}
                                    </Checkbox>
                                </Col>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="B" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_B}
                                    </Checkbox>
                                </Col>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="C" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_C}
                                    </Checkbox>
                                </Col>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="D" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_D}
                                    </Checkbox>
                                </Col>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="E" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_E}
                                    </Checkbox>
                                </Col>
                                <Col className={classes.Col50Mob} span={8}>
                                    <Checkbox value="F" style={{lineHeight: '32px'}}>
                                        {INFRASTRUCTURE_F}
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Фотографии">
                        <div className="custom-file">
                            <input type="file"
                                   className="custom-file-input"
                                   multiple
                                   lang="ru"
                                   onChange={onChangeHandler}>
                            </input>
                            <label className="custom-file-label" htmlFor="validatedCustomFile">
                                Одна или несколько, (.jpg, .png)</label>
                        </div>
                    </Form.Item>

                    {!this.props.userData
                        ? <Form.Item name="secret"
                                     plaseholder="Нужен для удаления этого объявления"
                                     label="Пароль на удаление" rules={[{required: !this.state.user}]}>
                            <Input/>
                        </Form.Item>
                        : null
                    }

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>

                </Form>
            </DefaultLayout> : <Loader/>
        );
    }
};

const mapDispatch = dispatch => ({
    createAd: data => dispatch(createAd(data)),
    loadFiles: data => dispatch(handlerLoadFiles(data)),
    cityHandler: city => dispatch(handlerCityForLoadingMetro(city)),
    typeOfApplicantHandler: city => dispatch(handlerTypeOfApplicant(city)),
    thisUser: id => dispatch(thisUserData({id})),
    isLoaded: () => dispatch(isLoadedTrue())
})

const mapState = state => ({
    files: state.app.create.files,
    stations: state.app.create.metro,
    typeOfApplicant: state.rent.create.typeOfApplicant,
    userData: state.app.user,
    loaded: state.app.loaded
})

export default connect(mapState, mapDispatch)(CreateAdForm);