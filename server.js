const express = require("express");
const path = require("path");
const next = require("next");
const app = next({});
const handle = app.getRequestHandler();

const server = express();
// serve static assets directly from the build-time-generated ".next" folder
server.use("/_next", express.static(path.join(__dirname, ".next")));
// serve all other requests with Next
server.get("*", (req, res) => handle(req, res));

module.exports = server;
