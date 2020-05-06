module.exports = (sequelize, Sequelize) => {
    const Rent = sequelize.define("rent-ad", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });

    return Rent;
};
