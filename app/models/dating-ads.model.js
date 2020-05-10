module.exports = (sequelize, Sequelize) => {
    const DatingAds = sequelize.define("dating-ads", {
        title: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.INTEGER
        }
    })
    return DatingAds;
}