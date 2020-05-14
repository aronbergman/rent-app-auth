module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT()
        },
        description: {
            type: Sequelize.TEXT()
        },
        count: {
            type: Sequelize.INTEGER
        }
    })
    return News;
}