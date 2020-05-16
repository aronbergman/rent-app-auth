const controller = require("../controllers/chats.controller");
const {authJwt} = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/chats/user-chats",
        [authJwt.verifyToken],
        controller.getUserChats
    );
}