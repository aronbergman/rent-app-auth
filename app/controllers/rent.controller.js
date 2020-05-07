const db = require("../models");
const config = require("../config/auth.config");
const Rent = db.rent;
const User = db.user;

const Op = db.Sequelize.Op;

exports.createAd = (req, res) => {

    const {
        username,
        email,
        typeOfApplicant,
        typeOfObject,
        sizeOfObject,
        metroStations,
        distanceMetro,
        description,
        price,
        floor,
        infrastructure,
        deposit,
        renovation,
        city,
        userId
    } = req.body

    Rent.create({
        username,
        email,
        typeOfApplicant,
        typeOfObject,
        sizeOfObject,
        metroLine: JSON.stringify(metroStations),
        infrastructure: JSON.stringify(infrastructure),
        distanceMetro,
        description,
        price,
        floor,
        deposit,
        renovation,
        userId,
        city,
        active: 1
    })
        .then(() => {
            res.send({message: "Объявление создано!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.fetchAll = (req, res) => {
    Rent.findAll({
        limit: 10
    })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.fetchUser = (req, res) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(response => {
            const userId = response['id']
            userId === req.body.id
                ? resolve(response)
                : reject()
        })
    }).then(() => {
        Rent.findAll({
            where: {
                userId: req.body.id
            }
        })
            .then(response => {
                res.status(200).send(response);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
}