import React from 'react';
import classes from './styles.module.scss'
import {Card} from 'antd';
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import dateParser from "../../../helpers/dateParser";
import {Link} from "react-router-dom";
import {cityParser, renovationParser} from "../../../helpers/rentDataParsers";

const AdCardComponent = ({ad}) => {

    const w25 = {
        width: '25%'
    };

    return (
        <Link target="_blank" to={`/rent/${ad.id}`}>
            <Card title={ad.title} className={classes.Card}>
                {!!ad.userId && <div className={classes.RegisterBage}><CheckCircleOutlined/> Подтверждено</div>}
                <Card.Grid hoverable={false} style={w25}>ID: {ad.id}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Город: {cityParser(ad.city)}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Метро: {ad.metroStations}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>До метро: {ad.distanceMetro}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Стоимость: {ad.price ? ad.price : 'не указана'}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Ремонт: {renovationParser(ad.renovation)}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Инфраструктура: {ad.infrastructure}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Депозит: {ad.deposit}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Описание: {ad.description}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Этаж: {ad.floor}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Email: {ad.email}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Telegram: {ad.username}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Создано: {dateParser(ad.updatedAt)}</Card.Grid>
            </Card>
        </Link>
    )
};

export default AdCardComponent;
