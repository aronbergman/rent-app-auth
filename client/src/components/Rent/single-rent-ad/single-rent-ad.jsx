import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {handlerDeleteRentAd, handlerSingleRentAd} from "../../../redux/thunks/rent-ad.thunks";
import Loader from "../../Loader/Loader";
import AdCardComponent from "../ad-card/ad-card.component";
import classes from "./styles.module.scss";
import {Button} from "antd";
import {Modal, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import DefaultLayout from "../../Layouts/default.layout";
import baseUrl from "../../../baseurl";

const host = baseUrl()

const SingleRentAd = props => {
    const [ad, setAd] = useState('')
    const [images, setImages] = useState('')

    useEffect(() => {
        const id = props.match.params.id
        props.fetchSingleRentAd(id).then(res => {
            setAd(res)
            setImages(JSON.parse(res.images))
        })
    }, [])

    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePassword = e => setPassword(e.target.value)

    const modalHandler = () => {
        props.onDeleteHendler({
            id: ad.id,
            password,
            secret: ad.secret
        }).then(() => props.history.push('/rent'))
    }

    return (
        ad ? <DefaultLayout>
            <div className={classes.CreateAd}>
                <Button shape="round" size='large' onClick={() => props.history.push('/rent')}>
                    Вернуться в ленту
                </Button>
                <Button shape="round" size='large' onClick={handleShow}>
                    Удалить объявление
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление объявления</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Body">
                        Введите пароль, который Вы добавили к объявлению при создании.
                        Если Вы уже зарегистрированный пользователь, то удалить объявление можно из раздела <Link
                        to={'/profile'}>Профиль пользователя</Link>.
                    </Modal.Body>
                    <Form.Control className={classes.InputPassword} type="password" placeholder="Пароль"
                                  onChange={handlePassword}/>
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

            <div style={{pointerEvents: 'none'}}>
                <AdCardComponent ad={ad}/>
            </div>

            {ad.email && <h4>Email: {ad.email}</h4>}
            {ad.username && <h4>Telegram: {ad.username}</h4>}


            {images && images.map(img => {
                return <img style={{width: '100%'}} src={`${host}/images/${img}`} alt=""/>
            })}
        </DefaultLayout> : <Loader/>
    );
};

const mapDispatch = dispatch => ({
    fetchSingleRentAd: id => dispatch(handlerSingleRentAd(id)),
    onDeleteHendler: ad => dispatch(handlerDeleteRentAd(ad))
})

export default connect(null, mapDispatch)(SingleRentAd);
