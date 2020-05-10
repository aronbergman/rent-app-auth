module.exports = (sequelize, Sequelize) => {
    const IntervalRent = sequelize.define("interval-rent-ad", {
        title: { // Сгенерированная строка из состояния объявления
            type: Sequelize.STRING
        },
        username: { // Ник в телеграмм
            type: Sequelize.STRING
        },
        name: { // Имя для вывода
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        typeOfApplicant: {
            type: Sequelize.INTEGER
        },
        typeOfObject: {
            type: Sequelize.STRING
        },
        sizeOfObject: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.INTEGER
        },
        metroStations: {
            type: Sequelize.STRING // Это объект
        },
        distanceMetro: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING(3000)
        },
        price: {
            type: Sequelize.INTEGER
        },
        floor: {
            type: Sequelize.INTEGER
        },
        infrastructure: {
            type: Sequelize.STRING
        },
        deposit: {
            type: Sequelize.INTEGER
        },
        renovation: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        images: {
            type: Sequelize.STRING
        },
        secret: {
            type: Sequelize.STRING
        }
    });

    return IntervalRent;
};