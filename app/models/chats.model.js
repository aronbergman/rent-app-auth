module.exports = (sequelize, Sequelize) => {
    const Chats = sequelize.define("chats", {
        fromUserId: {
            type: Sequelize.INTEGER
        },
        toUserId: {
            type: Sequelize.INTEGER
        },
        fromUserName: {
            type: Sequelize.STRING
        },
        toUserName: {
            type: Sequelize.STRING
        },
        room: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    })
    return Chats;
}