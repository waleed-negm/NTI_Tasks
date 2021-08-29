const express = require("express");
require("../app/db/connection");
const app = express();
const tRoutes = require("../routes/task.route");
app.use(express.json());
app.use("/task", tRoutes);
module.exports = app;
