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
        }
    })
    return News;
}