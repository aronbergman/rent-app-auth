import React from 'react';
import classes from './styles.module.scss'
import {Card} from 'antd';

const AdCardComponent = ({ad}) => {
    console.log(ad)

    // createdAt: "2020-05-07T18:03:03.000Z"
    // deposit: 1
    //+ description: "Хочу с балконом"
    //+ distanceMetro: 300
    // email: "brgmn@icloud.com"
    //+ floor: 4
    // id: 1
    //+ infrastructure: "["A"]"
    //+ metroLine: "["red"]"
    //+ price: 26000
    //+ renovation: "3"
    //+ sizeOfObject: 2
    //+ typeOfApplicant: 0
    //+ typeOfObject: "flat"
    // updatedAt: "2020-05-07T18:03:03.000Z"
    // username: "aronbergman"

    const w25 = {
        width: '25%'
    };
    
    const w50 = {
        width: '50%'
    };

    const title = `
    ${ad.typeOfApplicant === 0 ? 'Сниму' : 'Сдам'}
    ${ad.typeOfObject === 'flat' ? 'квартиру' : ad.typeOfObject === 'room' ? 'комнату' : ad.typeOfObject === 'bad' ? 'койко-место' : ''}
    ${ad.typeOfObject === 'room' ? `в ${ad.sizeOfObject} комнатной квартире` : ''}
    ${ad.price ? `за ${ad.price} рублей` : ''}
    `

    console.log(title)

    return (
        <Card title={title}>
            <Card.Grid hoverable={false} style={w25}>Ветки метро: {ad.metroLine}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>До метро: {ad.distanceMetro} метров</Card.Grid>
            <Card.Grid hoverable={false} style={w50}>Рядом: {ad.infrastructure}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Этаж: {ad.floor}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Тип ремонта: {ad.renovation}</Card.Grid>
            <Card.Grid hoverable={false} style={w50}>{ad.description}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Есть фото (!)</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Депозит: {ad.deposit}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Telegram: {ad.username}</Card.Grid>
            <Card.Grid hoverable={false} style={w25}>Email: {ad.email}</Card.Grid>
        </Card>
    )
};

export default AdCardComponent;
