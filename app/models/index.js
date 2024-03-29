const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = Sequelize;
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.rent = require("../models/rent.model.js")(sequelize, Sequelize);
db.intervalRent = require("../models/interval-rent.model.js")(sequelize, Sequelize);
db.news = require("../models/news.model.js")(sequelize, Sequelize);
// Сделать соотношение с базой пользователей, связать
db.chats = require("./chats.model.js")(sequelize, Sequelize);
db.messages = require("./messages.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
