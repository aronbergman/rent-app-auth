import React from 'react';
import classes from './styles.module.scss'
import {Card} from 'antd';
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import {Link} from "react-router-dom";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";

const AdCardComponent = ({ad}) => {
    const w25 = {width: '25%'};

    const title = () => (
        <div className={classes.Header}>
            <div className={classes.IdBage}><NumberOutlined/>{ad.id}</div>
            {ad.title}
        </div>
    )

    return (
        <Link to={`/rent/${ad.id}`}>
            <Card title={title()} className={classes.Card}>
                {!!ad.userId && <div className={classes.RegisterBage}><CheckCircleOutlined/> Автор подтвержден</div>}
                {/*<Card.Grid hoverable={false} style={w25}>Город: {cityParser(ad.city)}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>До метро: {ad.distanceMetro}</Card.Grid>*/}
                <Card.Grid hoverable={false} style={w25}>{ad.images.length ? ' ✅ Есть фото' : 'Без фото'}</Card.Grid>
                <Card.Grid hoverable={false} className={classes.Metro}>
                    <div className={classes.MetroContainer}>
                        {ad.metroStations.length ? ad.metroStations.map((station, index) => {
                            return (
                                <div key={index} className={classes.MetroItem}>
                                    <div className={classes.MetroColor}
                                         style={{backgroundColor: `#${station.color}`,}}>&nbsp;</div>
                                    {station.name}
                                </div>
                            )
                        }) : null}
                        &nbsp;
                    </div>
                </Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Автор: <strong>{ad.name}</strong></Card.Grid>
                <Card.Grid hoverable={false}
                           className={classes.Price}
                           style={w25}>{ad.price ? `${ad.price} ₽` : 'Cтоимость не указана'}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Ремонт: <strong>{ad.renovation}</strong></Card.Grid>
                {/*<Card.Grid hoverable={false} style={w25}>Инфраструктура: {ad.infrastructure}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>Депозит: {ad.deposit}</Card.Grid>*/}
                <Card.Grid className={classes.Description} hoverable={false} style={{width: '50%'}}>{ad.description}</Card.Grid>
                {/*<Card.Grid hoverable={false} style={w25}>Этаж: {ad.floor}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>Создано: {dateParser(ad.updatedAt)}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>ID: {ad.id}</Card.Grid>*/}
            </Card>
        </Link>
    )
};

export default AdCardComponent;
