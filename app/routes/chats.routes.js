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

    app.post(
        "/api/chats/get-chat-history",
        [authJwt.verifyToken],
        controller.getUserChatHistory
    );

    app.post(
        "/api/chats/set-chat-history",
        [authJwt.verifyToken],
        controller.setUserChatHistory
    );

    app.post(
        "/api/chats/create-new-room",
        [authJwt.verifyToken],
        controller.createNewRoom
    );
}