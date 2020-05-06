const db = require("../models");
const config = require("../config/auth.config");
const Rent = db.rent;

const Op = db.Sequelize.Op;

exports.createAd = (req, res) => {
    // Save User to Database
    Rent.create({
        username: req.body.username,
        email: req.body.email
    })
        .then(() => {
            res.send({message: "Пост успешно  создан!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};