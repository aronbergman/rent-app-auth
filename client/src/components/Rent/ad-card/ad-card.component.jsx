import React, {useEffect, useState} from 'react';
import classes from './styles.module.scss'
import {Card} from 'antd';
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import {Link} from "react-router-dom";
import {renovationParser} from "../../../helpers/rentDataParsers";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";

const AdCardComponent = ({ad}) => {

    const [stations, setStations] = useState([])
    const w25 = {width: '25%'};

    useEffect(() => {
        if (ad.metroStations) {
            const stations = JSON.parse(ad.metroStations)
            const all = []
            for (let i = 0; i < stations.length && i < 4; i++) {
                let parseColor = stations[i].split('|')
                all.push({name: parseColor[0], color: parseColor[1]})
            }
            setStations(all)
        }
    }, [])

    const title = () => (
        <div className={classes.Header}>
            <div className={classes.IdBage}><NumberOutlined/>{ad.id}</div>
            {ad.title}
        </div>
    )

    return (
        <Link target="_blank" to={`/rent/${ad.id}`}>
            <Card title={title()} className={classes.Card}>
                {!!ad.userId && <div className={classes.RegisterBage}><CheckCircleOutlined/> Автор подтвержден</div>}
                {/*<Card.Grid hoverable={false} style={w25}>Город: {cityParser(ad.city)}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>До метро: {ad.distanceMetro}</Card.Grid>*/}
                <Card.Grid hoverable={false} style={w25}>{ad.images.length > 2 ? ' ✅ Есть фото' : 'Без фото'}</Card.Grid>
                <Card.Grid hoverable={false} className={classes.Metro}>
                    <div className={classes.MetroContainer}>
                        {stations.length ? stations.map(station => {
                            return (
                                <div className={classes.MetroItem}>
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
                           style={w25}>{ad.price ? `${ad.price.toLocaleString('ru')} ₽` : 'Cтоимость не указана'}</Card.Grid>
                <Card.Grid hoverable={false} style={w25}>Ремонт: <strong>{renovationParser(ad.renovation)}</strong></Card.Grid>
                {/*<Card.Grid hoverable={false} style={w25}>Инфраструктура: {ad.infrastructure}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>Депозит: {ad.deposit}</Card.Grid>*/}
                <Card.Grid hoverable={false} style={{width: '50%'}}>Описание: {ad.description}</Card.Grid>
                {/*<Card.Grid hoverable={false} style={w25}>Этаж: {ad.floor}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>Создано: {dateParser(ad.updatedAt)}</Card.Grid>*/}
                {/*<Card.Grid hoverable={false} style={w25}>ID: {ad.id}</Card.Grid>*/}
            </Card>
        </Link>
    )
};

export default AdCardComponent;
