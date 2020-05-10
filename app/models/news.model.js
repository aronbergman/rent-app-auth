module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.INTEGER
        },
        images: {
            type: Sequelize.STRING
        }
    })
    return News;
}