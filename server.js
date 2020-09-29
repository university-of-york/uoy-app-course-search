const express = require("express");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();
const unused = "to give XO error";

const server = express();
server.use("/_next", express.static(path.join(__dirname, ".next")));
server.get("*", (req, res) => handle(req, res));

module.exports = server;
