const db = require("../models");
const {v4: uuidv4} = require('uuid');
const Chats = db.chats;
const User = db.user;
const Messages = db.messages;

exports.getUserChats = (req, res) => {

    const chats = []
    const interlocutor = []

    Chats.findAll({
        limit: 100,
        where: {
            fromUserId: req.body.id
        },
        order: [['createdAt', 'DESC']]
    })
        .then(fromUserId => {
            chats.push(...fromUserId)

            for (let i = 0; i < fromUserId.length; i++) interlocutor.push(fromUserId[i].toUserId);

            Chats.findAll({
                limit: 100,
                where: {toUserId: req.body.id},
                order: [['createdAt', 'DESC']]
            }).then(toUserId => {
                chats.push(...toUserId)

                for (let i = 0; i < toUserId.length; i++) interlocutor.push(toUserId[i].fromUserId);

                User.findAll({
                    where: {id: interlocutor}
                })
                    .then(data => {
                        const usersStatus = []
                        data.map(user => {
                            usersStatus.push({
                                userId: user.id,
                                isOnline: user.isOnline
                            })
                        })
                        res.status(200).send({chats, usersStatus});
                    })
            })
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.getUserChatHistory = (req, res) => {
    const {room, user} = req.body;
    Messages.findAll({
        limit: 100,
        where: {room},
        order: [['createdAt', 'DESC']]
    }).then(response => {

        Chats.findOne({
            where: {room}
        }).then(responseChatOne => {
            if (responseChatOne.lastSendUserId !== user.id) {

                Chats.update({notReadCounter: 0}, {where: {room}})
                    .then(() => {
                        res.status(200).send(response)
                    })
            } else {
                res.status(200).send(response);
            }
        })

    })
}

exports.setUserChatHistory = (req, res) => {
    const {room, message, from} = req.body

    Messages.create({room, message, from, status: 1})
        .then(responseMes => {

            Chats.findOne({
                where: {room}
            }).then(response => {
                if (response.lastSendUserId === from) {
                    Chats.update(
                        {notReadCounter: ++response.notReadCounter},
                        {where: {room}}
                    ).then(() => {
                        res.status(200).send(responseMes);
                    })
                } else {
                    Chats.update({
                            notReadCounter: 1,
                            lastSendUserId: from
                        },
                        {where: {room}}
                    ).then(() => {
                        res.status(200).send(responseMes);
                    })
                }
            })


        })

    // если автор равен тому, кто в базе сейчас последний, то инкримент,
    //     если нет, то от нуля + 1

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
            }).then(response => {
                res.status(200).send(response);
            })
        })
    })

    // Делаю запросы в базу данных на имена пользователей.
    //TODO: В случае, когда имена пользователей будут заменятья, я буду в этот момент пробегаться по всем комнатам и заменять там имя


}