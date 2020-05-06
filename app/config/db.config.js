module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Salut@3462",
  DB: "rent_app",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
