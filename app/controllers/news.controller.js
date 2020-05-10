const db = require("../models");
const News = db.news;

exports.fetchAll = (req, res) => {

    News.count().then(response => {
        const count = response
        News.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']]
        })
            .then(response => {
                res.status(200).send({
                    news: response,
                    count
                });
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
}

exports.fetchOffset = (req, res) => {
    News.findAll({
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