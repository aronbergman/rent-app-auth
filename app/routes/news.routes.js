const controller = require("../controllers/news.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        `/api/news/fetch-all`,
        controller.fetchAll
    );

    app.post(
        `/api/news/fetch-offset`,
        controller.fetchOffset
    );

    app.post(
        `/api/news/create-post`,
        controller.createPost
    );

    app.post(
        `/api/news/fetch-single`,
        controller.singlePost
    );

}