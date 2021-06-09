const express = require("express");
const path = require("path");
const next = require("next");
const app = next({});
const handle = app.getRequestHandler();
const url = require("url");
const { applicationBasePath } = require("./src/constants/basePath");

const server = express();
// serve static assets directly from the build-time-generated ".next" folder
server.use(`${applicationBasePath}/_next`, express.static(path.join(__dirname, ".next")));
// serve all other application requests with Next
server.get(applicationBasePath, (req, res) => handle(req, res));
// redirect users from "/" to the application
server.get("/", (req, res) =>
    res.redirect(
        url.format({
            pathname: applicationBasePath,
            query: req.query,
        })
    )
);

module.exports = server;
