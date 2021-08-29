const Task = require("../models/task.model");
const generateStatus = (apiStatus, data, message) => {
    return {
        apiStatus,
        data,
        message,
    };
};
const addTask = async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        res.status(200).send(generateStatus(true, newTask, "task added successfuly"));
    } catch (e) {
        res.status(500).send(generateStatus(false, e.message, "cant add task"));
    }
};
const allTasks = async (req, res) => {
    try {
        myTasks = await Task.find();
        res.status(200).send(generateStatus(true, myTasks, "fetched successfly"));
    } catch (e) {
        res.status(500).send(generateStatus(false, e.message, "cant fetch tasks"));
    }
};
const singleTask = async (req, res) => {
    const id = req.params.id;
    try {
        result = await Data.findById(id);
        if (!result) return status(404).send(generateStatus(false, null, "task not found"));
        res.status(200).send(generateStatus(true, result, "task retrived successfuly"));
    } catch (e) {
        res.status(500).send(generateStatus(false, e.message, "cant load task"));
    }
};
const deleteTask = async (req, res) => {
    try {
        id = req.params.id;
        const data = await Task.findByIdAndDelete(id);
        if (!data) return res.status(404).send(generateStatus(false, null, "task not found"));
        res.status(200).send(generateStatus(true, data, "task deleted"));
    } catch (e) {
        res.status(500).send(generateStatus(false, e.message, "cant delete task"));
    }
};
const editTask = async (req, res) => {
    try {
        id = req.params.id;
        allowed = ["dueDate"];
        requested = Object.keys(req.body);
        const isValidUpdates = requested.every(r => allowed.includes(r));
        if (!isValidUpdates) return res.status(500).send(generateStatus(false, null, "invalid updates"));
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidator: true });
        if (!task) return res.status(404).send(generateStatus(false, e.message, "task not found"));
        res.status(200).send(generateStatus(true, task, "updated successfuly"));
    } catch (e) {
        res.status(500).send(generateStatus(false, e.message, "cant edit"));
    }
};

module.exports = { addTask, allTasks, singleTask, deleteTask, editTask };
