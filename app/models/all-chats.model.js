module.exports = (sequelize, Sequelize) => {
    const AllChats = sequelize.define("all-chats", {
        fromUserId: {
            type: Sequelize.INTEGER
        },
        toUserId: {
            type: Sequelize.INTEGER
        },
        room: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        messages: {
            type: Sequelize.STRING
        },
        users: {
            type: Sequelize.STRING
        },
        typingUsers: {
            type: Sequelize.STRING
        }
    })
    return AllChats;
}