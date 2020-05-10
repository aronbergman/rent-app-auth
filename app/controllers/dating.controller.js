const db = require("../models");
const DatingCategories = db.datingCategories;
const DatingAds = db.datingAds;

exports.fetchAll = (req, res) => {
    DatingCategories.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.fetchSingleCategory = (req, res) => {
    DatingAds.findAll({
        limit: 10,
        where: {
            category: req.body.id
        },
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            const ads = response

            DatingCategories.findOne({
                where: {
                    id: req.body.id
                }
            }).then(response => {
                res.status(200).send({
                    category: response,
                    ads
                });
            }).catch(err => {
                res.status(500).send({message: err.message});
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}