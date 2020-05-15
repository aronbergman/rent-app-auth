import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Loader from "../../Loader/Loader";
import classes from "./styles.module.scss";
import {Button} from "antd";
import {Modal, Form, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import DefaultLayout from "../../Layouts/default.layout";
import baseUrl from "../../../baseurl";
import {handlerDeleteDatingAd, handlerSingleDatingAd} from "../../../redux/thunks/dating.thunks";

const host = baseUrl()

const SingleDatingAd = props => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

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
            props.history.push('/dating')
        }).catch(() => {
            setErrorForm('Объявление не удалено. Попробуйте позже.')
        })
    }

    return (
        props.ad && props.loaded ? <DefaultLayout>
            <div className={classes.CreateAd}>
                <Button shape="round" size='large' onClick={() => props.history.push('/dating')}>
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
                <p>Автор <strong>{props.ad.name}</strong>, обновлено <strong>{props.ad.updatedAt}</strong>, просмотров <strong>{1+props.ad.counter}</strong></p>
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
                    <p className={classes.Description}>{props.ad.description}</p>
                </div>

                <div className={classes.Section}>
                    {!!props.ad.email &&
                    <p className={classes.Email}>Email: <Link to={`mailto:${props.ad.email}`}>{props.ad.email}</Link>
                    </p>}
                    {!!props.ad.username &&
                    <p className={classes.Username}>Telegram: <strong>{props.ad.username}</strong></p>}
                </div>

                {!!props.ad.images.length && <div className={classes.SectionImage}>
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

        </DefaultLayout> : <Loader/>
    );
};

const mapState = state => ({
    ad: state.dating.singleAd,
    loaded: state.app.loaded
})

const mapDispatch = dispatch => ({
    fetchSingleRentAd: id => dispatch(handlerSingleDatingAd(id)),
    onDeleteHendler: ad => dispatch(handlerDeleteDatingAd(ad)),
    // onSingleAd: ad => dispatch(handlerSingleAd(ad))
})

export default connect(mapState, mapDispatch)(SingleDatingAd);
