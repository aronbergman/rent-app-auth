const {authJwt} = require("../middleware");

const controller = require("../controllers/rent.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/rent/create-ad",
        controller.createAd
    );

    app.post(
        "/api/rent/fetch-all",
        controller.fetchAll
    );

    app.post(
        "/api/rent/fetch-offset",
        controller.fetchOffset
    );

    app.post(
        "/api/rent/fetch-user",
        controller.fetchUser
    );

    app.post(
        "/api/rent/fetch-single-ad",
        controller.fetchSingleAd
    );

    app.post(
        "/api/rent/delete",
        controller.fetchDeleteAd
    );

    app.post(
        "/api/rent/delete-auth",
        [authJwt.verifyToken],
        controller.fetchDeleteAdAuth
    );
};
