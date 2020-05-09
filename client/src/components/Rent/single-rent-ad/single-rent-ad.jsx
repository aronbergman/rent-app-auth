import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {handlerDeleteRentAd, handlerSingleRentAd} from "../../../redux/thunks/rent-ad.thunks";
import Loader from "../../Loader/Loader";
import AdCardComponent from "../ad-card/ad-card.component";
import classes from "./styles.module.scss";
import {Button} from "antd";
import {Modal, Form} from "react-bootstrap";

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
        ad ? <div>
            <div className={classes.CreateAd}>
                <Button shape="round" size='large' onClick={handleShow}>
                    Удалить объявление
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление объявления</Modal.Title>
                    </Modal.Header>
                    <Form.Control className={classes.InputPassword} type="password" placeholder="Пароль" onChange={handlePassword} />
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
                return <img style={{width: '100%'}} src={`http://localhost:8080/images/${img}`} alt=""/>
            })}
        </div> : <Loader/>
    );
};

const mapDispatch = dispatch => ({
    fetchSingleRentAd: id => dispatch(handlerSingleRentAd(id)),
    onDeleteHendler: ad => dispatch(handlerDeleteRentAd(ad))
})

export default connect(null, mapDispatch)(SingleRentAd);
