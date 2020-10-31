const express = require("express");
const bodyParser = require("body-parser");
const Sentry = require('@sentry/node');
const consola = require('consola')
const cors = require("cors");
const path = require('path');
require('dotenv').config();
const {NODE_ENV, SERVER_PORT, CORS_DEV_PORT} = process.env;

const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

if (process.env.NODE_ENV === 'production') {
    Sentry.init({dsn: 'https://80ec2091533941ef80154e3220bae060@o392602.ingest.sentry.io/5240421'});
    app.use(Sentry.Handlers.requestHandler());
}

const multer = require('multer')

var corsOptions = {
    origin: `http://localhost:${NODE_ENV === 'production' ? SERVER_PORT : CORS_DEV_PORT}`
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/rent.routes')(app);
require('./app/routes/news.routes')(app);
require('./app/routes/chats.routes')(app);

require('./app/messages/index')(io);

require('./app/middleware/intervalRentAdCreater.js')(db);
require('./app/routes/file.routes.js')(app, multer, express);

consola.info({
    message: `process.env.NODE_ENV ${process.env.NODE_ENV}`,
    badge: true
});

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My Sentry error!');
});

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

if (process.env.NODE_ENV === 'production') {
    app.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            if (error.status) {
                return true
            }
            return false
        }
    }));
}

if (!module.parent) {
    server.listen(SERVER_PORT, () => {
        consola.info({
            message: `Server is running on port ${SERVER_PORT}.`,
            badge: true
        });
    });
}

// initialRoles();
function initialRoles() {
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