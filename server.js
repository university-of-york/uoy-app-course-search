const express = require("express");
const path = require("path");
const next = require("next");
const app = next({});
const handle = app.getRequestHandler();
const { applicationBasePath } = require("./src/constants/basePath");

const server = express();
// serve static assets directly from the build-time-generated ".next" folder and specify how long to cache
server.use(
    `${applicationBasePath}/_next`,
    express.static(path.join(__dirname, ".next"), { maxAge: "1d", immutable: true })
);
// serve all other requests with Next
server.get("*", (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    handle(req, res);
});

module.exports = server;
