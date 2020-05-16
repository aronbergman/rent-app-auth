const express = require("express");
const bodyParser = require("body-parser");
const Sentry = require('@sentry/node');
const consola = require('consola')
const cors = require("cors");
const path = require('path');
require('dotenv').config();
const {NODE_ENV, SERVER_PORT, CORS_DEV_PORT} = process.env;

const app = express();

const socketApp = require('http').createServer()
const io = module.exports.io = require('socket.io')(socketApp)

const SocketManager = require('./app/messages/SocketManager')

io.on('connection', SocketManager)

socketApp.listen(5002, ()=>{
    console.log("Connected to port:" + 5002);
})

Sentry.init({ dsn: 'https://80ec2091533941ef80154e3220bae060@o392602.ingest.sentry.io/5240421' });
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

const multer = require('multer')

var corsOptions = {
    origin: `http://localhost:${NODE_ENV === 'production' ? SERVER_PORT : CORS_DEV_PORT}`
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
// app.get("/", (req, res) => {
//     res.json({message: "Welcome to aronbergman application."});
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/rent.routes')(app);
require('./app/routes/dating.routes')(app);
require('./app/routes/news.routes')(app);
require('./app/routes/chats.routes')(app);

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
// The error handler must be before any other error middleware and after all controllers
if (process.env.NODE_ENV === 'production') {
    app.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            if (error.status === 404 || error.status === 500) {
                return true
            }
            return false
        }
    }));
}

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
if (!module.parent) {
    app.listen(SERVER_PORT, () => {
        consola.info({
            message: `Server is running on port ${SERVER_PORT}.`,
            badge: true
        });
    });
}

// initial();
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