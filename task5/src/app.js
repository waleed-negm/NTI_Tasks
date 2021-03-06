require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const clientRouter = require("../routes/client.routes");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../design/views"));
hbs.registerPartials(path.join(__dirname, "../design/layouts"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded());
app.use(clientRouter);
module.exports = app;
