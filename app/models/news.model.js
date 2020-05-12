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
            type: Sequelize.STRING(10000)
        },
        description: {
            type: Sequelize.STRING(10000)
        },
        count: {
            type: Sequelize.INTEGER
        }
    })
    return News;
}