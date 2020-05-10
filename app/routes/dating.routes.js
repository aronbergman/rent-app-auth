const controller = require("../controllers/dating.controller");

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

}