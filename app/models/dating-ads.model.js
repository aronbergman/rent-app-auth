module.exports = (sequelize, Sequelize) => {
    const DatingAds = sequelize.define("dating-ads", {
        title: {
            type: Sequelize.STRING
        }
    })
    return DatingAds;
}