const controller = require("../controllers/dating.controller");
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
        `/api/dating/categories`,
        controller.fetchAll
    );

    app.post(
        `/api/dating/single-category`,
        controller.fetchSingleCategory
    );

    app.post(
        "/api/dating/fetch-offset",
        controller.fetchOffset
    );

    app.post(
        `/api/dating/create-ad`,
        controller.createAd
    );

    app.post(
        "/api/dating/fetch-single-ad",
        controller.fetchSingleAd
    );

    app.post(
        "/api/dating/fetch-user",
        controller.fetchUser
    );

    app.post(
        "/api/dating/delete",
        controller.fetchDeleteAd
    );

    app.post(
        "/api/dating/delete-auth",
        [authJwt.verifyToken],
        controller.fetchDeleteAdAuth
    );
}