const express = require("express");
const path = require("path");
const next = require("next");
const app = next({});
const handle = app.getRequestHandler();

const server = express();
server.use("/_next", express.static(path.join(__dirname, ".next")));
server.get("*", (req, res) => handle(req, res));

module.exports = server;
