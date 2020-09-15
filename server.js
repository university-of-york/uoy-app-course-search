const express = require("express");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require("url");
const pathMatch = require("path-match");

const server = express();
const route = pathMatch();
server.use("/_next", express.static(path.join(__dirname, ".next")));
server.get("*", (req, res) => handle(req, res));

module.exports = server;
