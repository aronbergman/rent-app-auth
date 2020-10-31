import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    handlerDeleteRentAd,
    handlerSingleRentAd,
} from "../../../redux/thunks/rent-ad.thunks";
import Loader from "../../Loader/Loader";
import classes from "./styles.module.scss";
import {Button} from "antd";
import {Modal, Form, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import DefaultLayout from "../../Layouts/default.layout";
import baseUrl from "../../../baseurl";
import {handlerStartNewRoom} from "../../../redux/thunks/chats.thunks";
import FirstMessageForm from "./first-message-form/FirstMessageForm";

const host = baseUrl()

const user = JSON.parse(localStorage.getItem('user'));

const SingleRentAd = props => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [createMessageForm, setCreateMessageForm] = useState(null);

    useEffect(() => {
        const id = props.match.params.id
        props.fetchSingleRentAd(id)
    }, [])

    const handleClose = () => {
        setShow(false);
        setErrorForm(null)
    }
    const handleShow = () => setShow(true);
    const handlePassword = e => setPassword(e.target.value)

    const modalHandler = () => {
        props.onDeleteHendler({
            id: props.ad.id,
            password,
            secret: props.ad.secret
        }).then(() => {
            props.history.push('/rent')
        }).catch(() => {
            setErrorForm('Объявление не удалено. Попробуйте позже.')
        })
    }

    const handlePrivatMessage = () => {
        props.startNewRoom({
            thisAd: {
                authorId: props.ad.userId,
                adId: props.ad.id
            },
            senderMessage: {
                id: user.id
            }
        }).then(data => {
            console.log('ROOM IN FRONT', data)
            // props.history.push(`/messages?room=${data.room}`)
            setCreateMessageForm({
                ...data,
                visible: true,
                ad: props.ad
            })
        })
    }

    return (
        props.ad && props.loaded ? <DefaultLayout>
            <div className={classes.CreateAd}>
                <Button shape="round" size='large' onClick={() => props.history.push('/rent')}>
                    Вернуться в ленту
                </Button>
                <Button shape="round" size='large' onClick={handleShow}>
                    Удалить
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление объявления</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={classes.Body}>
                        Введите пароль, который Вы добавили к объявлению при создании.
                        Если Вы уже зарегистрированный пользователь, то удалить объявление можно из раздела <Link
                        to={'/profile'}>Профиль пользователя</Link>.
                    </Modal.Body>
                    <Form.Control className={classes.InputPassword} type="password" placeholder="Пароль"
                                  onChange={handlePassword}/>
                    {!!errorForm && <Modal.Body className={classes.Body}>
                        <strong>{errorForm}</strong>
                    </Modal.Body>}

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="primary" onClick={modalHandler}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

            <div className={classes.Header}>
                <h2>{props.ad.title}</h2>
                <p>Автор <strong>{props.ad.name}</strong>, обновлено <strong>{props.ad.updatedAt}</strong>,
                    просмотров <strong>{props.ad.counterView}</strong></p>
            </div>

            <div className={classes.Body}>

                <div className={classes.MetroContainer}>
                    {props.ad.metroStations ? props.ad.metroStations.map((station, index) => {
                        return (
                            <div key={index} className={classes.MetroItem}>
                                <div className={classes.MetroColor}
                                     style={{backgroundColor: `#${station.color}`,}}>&nbsp;</div>
                                {station.name}
                            </div>
                        )
                    }) : null}
                </div>

                <div className={classes.Section}>
                    {!!props.ad.infrastructure &&
                    <p className={classes.Infrastructure}>Рядом: {props.ad.infrastructure.map(item =>
                        <span>&nbsp;{item};&nbsp;</span>)}</p>}
                    <p className={classes.DistanceMetro}>До метро: {props.ad.distanceMetro}</p>
                </div>

                <div className={classes.Section}>
                    <p className={classes.Description}>{props.ad.description}</p>
                </div>
                <div className={classes.Section}>
                    <p className={classes.Renovation}>Ремонт {props.ad.renovation}</p>
                    <h3 className={classes.Price}>{props.ad.price} ₽</h3>
                    {!!props.ad.images.length &&
                    <p className={classes.ImagesCount}>Загружено {props.ad.images.length} фото</p>}
                </div>

                <div className={classes.Section}>

                    {!!props.ad.userId && !!user && <Button shape="round" size='large' onClick={handlePrivatMessage}>
                        Личное сообщение
                    </Button>}

                    {!!props.ad.email &&
                    <p className={classes.Email}>Email: <Link to={`mailto:${props.ad.email}`}>{props.ad.email}</Link>
                    </p>}
                    {!!props.ad.username &&
                    <p className={classes.Username}>Telegram: <strong>{props.ad.username}</strong></p>}
                </div>


                {!!props.ad.images.length && <div className={classes.Section}>
                    <Carousel>
                        {props.ad.images.map(img => {
                            return <Carousel.Item>
                                <img className="d-block w-100" style={{width: '100%'}} src={`${host}/images/${img}`}
                                     alt=""/>
                            </Carousel.Item>
                        })}
                    </Carousel>
                </div>}
            </div>

            {createMessageForm && <FirstMessageForm
                data={createMessageForm}
                setCreateMessageForm={setCreateMessageForm}
            />}

        </DefaultLayout> : <Loader/>
    );
};

const mapState = state => ({
    ad: state.rent.singleAd,
    loaded: state.rent.loaded
})

const mapDispatch = dispatch => ({
    fetchSingleRentAd: id => dispatch(handlerSingleRentAd(id)),
    onDeleteHendler: ad => dispatch(handlerDeleteRentAd(ad)),
    startNewRoom: data => dispatch(handlerStartNewRoom(data))
})

export default connect(mapState, mapDispatch)(SingleRentAd);
