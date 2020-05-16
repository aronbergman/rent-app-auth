const db = require("../models");
const AllChats = db.allChats;

exports.getUserChats = (req, res) => {

    const chats = []

    AllChats.findAll({
        limit: 100,
        where: {
            fromUserId: req.body.id
            // !!!
        },
        order: [['createdAt', 'DESC']]
    })
        .then(fromUserId => {
            chats.push(...fromUserId)
            AllChats.findAll({
                limit: 100,
                where: {
                    toUserId: req.body.id
                },
                order: [['createdAt', 'DESC']]
            }).then(toUserId => {
                chats.push(...toUserId)
                res.status(200).send(chats);
            })
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}