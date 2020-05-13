const db = require("../models");
const DatingCategories = db.datingCategories;
const DatingAds = db.datingAds;
const bcrypt = require("bcryptjs");

const User = db.user;

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

exports.fetchOffset = (req, res) => {
    DatingAds.findAll({
        offset: req.body.offset * req.body.limit,
        limit: req.body.limit,
        subQuery: false,
        where: {
            category: req.body.category
        },
        order: [['createdAt', 'DESC']]
    })
        .then(response => {
            res.status(200).send({ads: response});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.fetchSingleCategory = (req, res) => {
    DatingAds.findAll({
        where: {
            category: req.body.id
        },
        order: [['createdAt', 'DESC']]
    }).then(coun => {
        const count = coun.length

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
                        count,
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
    })



}

exports.createAd = (req, res) => {
    const {
        name,
        username,
        email,
        city,
        metroStations,
        category,
        title,
        secret,
        userId,
        images
    } = req.body

    const token = secret ? bcrypt.hashSync(secret, 8) : null

    DatingAds.create({
        title,
        name,
        username,
        email,
        metroStations: JSON.stringify(metroStations),
        images: JSON.stringify(images),
        userId,
        city,
        secret: req.body.secret ? token : null,
        category
    })
        .then(() => {
            res.send({message: "Объявление создано!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.fetchSingleAd = (req, res) => {
    DatingAds.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(response => {

            DatingAds.update(
                {counter: ++response.counter},
                {where: {id: req.body.id}}
            )

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
        DatingAds.destroy({
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
    DatingAds.destroy({
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
        DatingAds.findAll({
            where: {
                userId: req.body.id
            }
        })
            .then(response => {
                res.status(200).send({ads: response});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
}