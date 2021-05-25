const express = require("express");
// const path = require("path");
const next = require("next");
const app = next({});
const handle = app.getRequestHandler();

const server = express();
// serve static assets directly from the build-time-generated ".next" folder
// server.use("/_next", express.static(path.join(__dirname, ".next"), { maxAge: 1000 })); // cache static assets for 1 day
// serve all other requests with Next
server.get("*", (req, res) => {
    // Cache dynamic pages for a day - you can verify that these headers are set using Chrome dev tools 'Network' tab
    res.setHeader("Cache-Control", "public, max-age=86400");
    handle(req, res);
});

module.exports = server;
