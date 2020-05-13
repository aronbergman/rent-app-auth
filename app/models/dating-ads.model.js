module.exports = (sequelize, Sequelize) => {
    const DatingAds = sequelize.define("dating-ads", {
        name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        metroStations: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        secret: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.INTEGER
        },
        counter: {
            type: Sequelize.INTEGER
        }
    })
    return DatingAds;
}