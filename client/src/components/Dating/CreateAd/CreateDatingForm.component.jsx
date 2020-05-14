import React from 'react';
import {connect} from 'react-redux'
import {Form, Input, Select, Button} from 'antd';
import classes from './styles.module.scss'
import DefaultLayout from "../../Layouts/default.layout";
import Header from "../../Header/Header.component";
import {CITY_66, CITY_77, CITY_78} from "../../../helpers/rentDataParsers";
import {handlerCityForLoadingMetro, handlerLoadFiles} from "../../../redux/thunks/app.thunks";
import {createAd, handlerDatingCategories} from "../../../redux/thunks/dating.thunks";

const {Option} = Select;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

class CreateDatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                id: null,
                name: null
            },
            selectedFile: [],
            loaded: 0,
            loadedFiles: [],
            user: {}
        }
    }

    cityHandler = e => this.props.cityHandler(e)

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        this.setState({user});
        const state = this.props.location.state
        console.log(state)
        if (state) {
            this.setState({category: state.category})
        }

        this.props.categories()
    }

    render() {
        const onFinish = values => {
            console.log('values', values)
            this.props.createAd({
                ...values,
                category: values.category ? values.category : this.state.category.id,
                userId: this.state.user ? this.state.user.id : 0,
                images: this.props.files
            }).then(() => this.props.history.push('/dating'))
        };

        const onChangeHandler = event => {
            const data = new FormData()
            for (let i = 0; i < event.target.files.length; i++) {
                data.append('file', event.target.files[i])
            }
            this.props.loadFiles(data)
        }

        return (
            <DefaultLayout>
                <Header>
                    <h2>Создать объявлние{this.state.category.name ? `, лента ${this.state.category.name}` : null}</h2>
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
                    <Form.Item name="name" rules={[{required: true}]} label="Твоё имя">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="username" label="Telegram">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{type: 'email', required: true}]}>
                        <Input/>
                    </Form.Item>

                    <br/>

                    <Form.Item
                        name="city"
                        label="Ты находишься"
                        rules={[{required: true}]}
                        hasFeedback
                    >
                        <Select placeholder="Выбери город" onChange={this.cityHandler}>
                            <Option value="77">{CITY_77}</Option>
                            <Option value="78">{CITY_78}</Option>
                            <Option value="66">{CITY_66}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="metroStations"
                        label="Метро"
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

                    <br/>

                    {(!!this.props.getCategories && !this.state.category.id) && <Form.Item
                        name="category"
                        label="Категория"
                        hasFeedback
                        rules={[{required: true, message: 'Выбери категорию'}]}
                    >
                        <Select placeholder="Выбери категорию">
                            {this.props.getCategories.map(cat => {
                                return <Option key={cat.id} value={cat.id}>{cat.title}</Option>
                            })}
                        </Select>
                    </Form.Item>}

                    <Form.Item name="title" rules={[{required: true}]} label="Заголовок">
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: 'Пожалуйста, укажите сведения'}]}
                        name="description" label="Дополнительные сведения">
                        <Input.TextArea/>
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
                        : null}

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </DefaultLayout>
        );
    }
};

const mapDispatch = dispatch => ({
    createAd: data => dispatch(createAd(data)),
    loadFiles: data => dispatch(handlerLoadFiles(data)),
    cityHandler: city => dispatch(handlerCityForLoadingMetro(city)),
    categories: () => dispatch(handlerDatingCategories())
})

const mapState = state => ({
    files: state.app.create.files,
    stations: state.app.create.metro,
    getCategories: state.dating.categories
})

export default connect(mapState, mapDispatch)(CreateDatingForm);