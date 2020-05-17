const db = require("../models");
const {v4: uuidv4} = require('uuid');
const Chats = db.chats;
const User = db.user;
const Messages = db.messages;

exports.getUserChats = (req, res) => {

    const chats = []

    Chats.findAll({
        limit: 100,
        where: {
            fromUserId: req.body.id
        },
        order: [['createdAt', 'DESC']]
    })
        .then(fromUserId => {
            chats.push(...fromUserId)
            Chats.findAll({
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

exports.getUserChatHistory = (req, res) => {
    Messages.findAll({
        limit: 100,
        where: {
            room: req.body.room
        },
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).send(response);
    })
}

exports.setUserChatHistory = (req, res) => {
    const {room, message, from, to} = req.body

    Messages.create({room, message, from, to, status: 1})
        .then(response => {
            res.status(200).send(response);
        })
}

exports.createNewRoom = (req, res) => {
    const {fromId, toId} = req.body

    User.findOne({
        where: {
            id: fromId
        }
    }).then(userFromData => {
        const nameFrom = userFromData.name

        User.findOne({
            where: {
                id: toId
            }
        }).then(userToData => {
            const nameTo = userToData.name
            const room = uuidv4()

            Chats.create({
                fromUserId: fromId,
                fromUserName: nameFrom,
                toUserName: nameTo,
                toUserId: toId,
                status: 0,
                room
            }).then(() => {
                res.status(200).send({room});
            })
        })
    })

    // Делаю запросы в базу данных на имена пользователей.
    //TODO: В случае, когда имена пользователей будут заменятья, я буду в этот момент пробегаться по всем комнатам и заменять там имя


}