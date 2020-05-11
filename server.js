const express = require("express");
const bodyParser = require("body-parser");
const consola = require('consola')
const cors = require("cors");
const path = require('path');
require('dotenv').config();
const {SERVER_PORT} = process.env;

const app = express();
const multer = require('multer')

var corsOptions = {
    origin: `http://localhost:8081`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to aronbergman application."});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/rent.routes')(app);
require('./app/routes/dating.routes')(app);
require('./app/routes/news.routes')(app);

require('./app/middleware/intervalRentAdCreater.js')(db);
require('./app/routes/file.routes.js')(app, multer, express);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => {
    consola.info({
        message: `Server is running on port ${SERVER_PORT}.`,
        badge: true
    });
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}