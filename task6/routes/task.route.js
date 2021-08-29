const express = require("express");
const router = new express.Router();
const taskController = require("../app/controller/task.controller");
router.post("/add", taskController.addTask);
router.get("/all", taskController.allTasks);
router.get("/all/:id", taskController.singleTask);
router.delete("/all/:id", taskController.deleteTask);
router.patch("/all/:id", taskController.editTask);

module.exports = router;
