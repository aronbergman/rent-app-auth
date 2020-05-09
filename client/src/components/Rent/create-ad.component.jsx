import React from 'react';
import {connect} from 'react-redux'
import {Form, Input, Select, InputNumber, Switch, Radio, Button, Checkbox, Row, Col} from 'antd';
import {
    createAd,
    handlerCityForLoadingMetro,
    handlerLoadFiles,
    handlerTypeOfApplicant
} from '../../redux/thunks/rent-ad.thunks';
import createTitleAd from '../../helpers/createTitleAd';
import classes from './styles.module.scss'

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
            loadedFiles: [],
            user: {}
        }
    }

    cityHandler = e => this.props.cityHandler(e)
    typeOfApplicantHandler = e => this.props.typeOfApplicantHandler(e.target.value)

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        this.setState({user})
    }

    render() {
        const onFinish = values => {
            const title = createTitleAd(values)
            console.log(values)
            this.props.createAd({
                ...values,
                userId: this.state.user ? this.state.user.id : 0,
                title,
                images: this.props.files
            }).then(() => this.props.history.push('/rent'))
        };

        const onChangeHandler = event => {
            const data = new FormData()
            for (let i = 0; i < event.target.files.length; i++) {
                data.append('file', event.target.files[i])
            }
            this.props.loadFiles(data)
        }

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
                    <Form.Item name="username" label="Ник или номер Telegram">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name" label="Твоё имя" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{type: 'email', required: true}]}>
                        <Input/>
                    </Form.Item>
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
                            <Option value="0">📦 Голые стены</Option>
                            <Option value="1">👵 Бабушкин</Option>
                            <Option value="2">🛏 Косметический</Option>
                            <Option value="3">🛋 Евроремонт</Option>
                            {/*<Option value="4"></Option>*/}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="city"
                        label="Город"
                        hasFeedback
                        rules={[{required: true, message: 'Пожалуйста, выберите город!'}]}
                    >
                        <Select placeholder="Выбери город" onChange={this.cityHandler}>
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

                            {this.props.stations.map(station => <Option value={`${station.name}|${station.color}`}>
                                <div className={classes.MetroItem}>
                                    <div className={classes.MetroColor}
                                         style={{backgroundColor: `#${station.color}`}}>&nbsp;</div>
                                    {station.name}
                                </div>
                            </Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="distanceMetro"
                        label="Расстояние до метро"
                        hasFeedback
                    >
                        <Select placeholder="500 метров (в соседнем квартале)">
                            <Option value="1">100 метров (у дома)</Option>
                            <Option value="2">300 метров (в моем квартале)</Option>
                            <Option value="3">500 метров (в соседнем квартале)</Option>
                            <Option value="4">1 км (10 минут пешком)</Option>
                            <Option value="5">2 км (пара остановок)</Option>
                            <Option value="6">более 2 км (дохрена далеко)</Option>
                        </Select>
                    </Form.Item>

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
                        ? <Form.Item name="sizeOfObject" label="Комнат в квартире">
                            <Radio.Group>
                                <Radio.Button value="1">1</Radio.Button>
                                <Radio.Button value="2">2</Radio.Button>
                                <Radio.Button value="3">3</Radio.Button>
                                <Radio.Button value="4">4</Radio.Button>
                                <Radio.Button value="5">5</Radio.Button>
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

                    <Form.Item label="Фотографии">
                        <div className="custom-file">
                            <input type="file"
                                   className="custom-file-input"
                                   multiple
                                   lang="ru"
                                   onChange={onChangeHandler}>
                            </input>
                            <label className="custom-file-label" htmlFor="validatedCustomFile">
                                Загрузите сразу несколько или друг за другом, (.jpg, .png)</label>
                        </div>
                    </Form.Item>

                    {!this.state.user
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
            </div>
        );
    }
};

const mapDispatch = dispatch => ({
    createAd: data => dispatch(createAd(data)),
    loadFiles: data => dispatch(handlerLoadFiles(data)),
    cityHandler: city => dispatch(handlerCityForLoadingMetro(city)),
    typeOfApplicantHandler: city => dispatch(handlerTypeOfApplicant(city))
})

const mapState = state => ({
    files: state.rent.create.files,
    stations: state.rent.create.metro,
    typeOfApplicant: state.rent.create.typeOfApplicant
})

export default connect(mapState, mapDispatch)(CreateAdForm);