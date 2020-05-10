module.exports = (sequelize, Sequelize) => {
    const DatingCategories = sequelize.define("dating-categories", {
        title: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    })
    return DatingCategories;
}