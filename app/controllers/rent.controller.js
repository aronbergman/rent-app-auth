const db = require("../models");
const Rent = db.rent;
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.createAd = (req, res) => {

    const {
        title,
        name,
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
        images,
        secret,
        userId
    } = req.body

    const token = secret ? bcrypt.hashSync(secret, 8) : null

    Rent.create({
        title,
        name,
        username,
        email,
        typeOfApplicant,
        typeOfObject,
        sizeOfObject,
        metroStations: JSON.stringify(metroStations),
        images: JSON.stringify(images),
        infrastructure: JSON.stringify(infrastructure),
        distanceMetro,
        description,
        price,
        floor,
        deposit,
        renovation,
        userId,
        city,
        secret: req.body.secret ? token : null,
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
    Rent.count().then(response => {
        const count = response
        Rent.findAll({
            limit: 10,
            subQuery: false,
            order: [['createdAt', 'DESC']]
        })
            .then(response => {
                res.status(200).send({
                    ads: response,
                    count
                });
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
}

exports.fetchOffset = (req, res) => {
    Rent.findAll({
        offset: req.body.offset * req.body.limit,
        limit: req.body.limit,
        subQuery: false,
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.fetchSingleAd = (req, res) => {
    Rent.findOne({
        where: {
            id: req.body.id,
            active: 1
        }
    })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.fetchDeleteAd = (req, res) => {

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        req.body.secret
    );

    if (passwordIsValid) {
        Rent.destroy({
            where: {
                id: req.body.id
            }
        }).then(() => {
            res.status(200).send({message: 'Удалено'});
        })
    } else {
        res.status(500).send({message: err.message});
    }
}

exports.fetchDeleteAdAuth = (req, res) => {
    Rent.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.status(200).send({message: 'Удалено'});
    })
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