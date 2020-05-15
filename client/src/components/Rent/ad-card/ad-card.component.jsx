import React from 'react';
import classes from './styles.module.scss'
import {Card} from 'antd';
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import {Link} from "react-router-dom";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";

const AdCardComponent = ({ad}) => {

    const title = () => (
        <div className={classes.Header}>
            <div className={classes.IdBage}><NumberOutlined/>{ad.id}</div>
           <div className={classes.Title}> {ad.title}</div>
        </div>
    )

    return (
        <Link to={`/rent/${ad.id}`}>
            <Card title={title()} className={classes.Card}>
                {!!ad.userId && <div className={classes.RegisterBage}><CheckCircleOutlined/> <span className={classes.Text}>Автор подтвержден</span></div>}
                <Card.Grid hoverable={false} className={classes.Metro}>
                    <div className={classes.MetroContainer}>
                        {ad.metroStations.length ? ad.metroStations.map((station, index) => {
                             return (
                                 index <4 ?<div key={index} className={classes.MetroItem}>
                                    <div className={classes.MetroColor}
                                         style={{backgroundColor: `#${station.color}`,}}>&nbsp;</div>
                                    {station.name}
                                </div>: null
                            )
                        }) : null}
                        &nbsp;
                    </div>
                </Card.Grid>
                <Card.Grid hoverable={false} className={classes.Images}>{ad.images.length ? ' ✅ Есть фото' : 'Без фото'}</Card.Grid>
                <Card.Grid hoverable={false} className={classes.Author}>Автор: <strong>{ad.name}</strong></Card.Grid>
                <Card.Grid hoverable={false}
                           className={classes.Price}>{ad.price ? `${ad.price} ₽` : 'Cтоимость не указана'}</Card.Grid>
                <Card.Grid hoverable={false} className={classes.Renovation}>Ремонт: <strong>{ad.renovation}</strong></Card.Grid>
                <Card.Grid className={classes.Description} hoverable={false}>{ad.description}</Card.Grid>
            </Card>
        </Link>
    )
};

export default AdCardComponent;
