module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define("messages", {
        room: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.INTEGER
        },
        from: {
            type: Sequelize.INTEGER
        }
    })
    return Messages;
}