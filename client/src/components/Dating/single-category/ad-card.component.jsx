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
            <span className={classes.Title}>
            {ad.title}
            </span>
        </div>
    )

    return (
        <Link to={`/dating/single/${ad.id}`}>
            <Card title={title()} className={classes.Card}>
                {!!ad.userId &&
                <div className={classes.RegisterBage}><CheckCircleOutlined/> <span className={classes.BageText}>Автор подтвержден</span>
                </div>}
                <Card.Grid hoverable={false} className={classes.Author}>Автор: <strong>{ad.name}</strong></Card.Grid>
                <Card.Grid hoverable={false}
                           className={classes.Photos}>{ad.images.length ? ' ✅ Есть фото' : 'Без фото'}</Card.Grid>
                <Card.Grid hoverable={false} className={classes.Metro}>
                    <div className={classes.MetroContainer}>
                        {ad.metroStations ? ad.metroStations.map((station, index) => {
                            return (<div key={index} className={classes.MetroItem}>
                                <div className={classes.MetroColor}
                                     style={{backgroundColor: `#${station.color}`,}}>&nbsp;</div>
                                {station.name}
                            </div>)
                        }) : null}
                        &nbsp;
                    </div>
                </Card.Grid>
                {/*<Card.Grid className={classes.Description} hoverable={false}*/}
                {/*           style={{width: '100%'}}>{ad.description}</Card.Grid>*/}
            </Card>
        </Link>
    )
};

export default AdCardComponent;
