const Task = require("../models/tasks");

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(400).json("error");
    }
}

const postTask = async (req, res, next) => {
    try {
        const newtask = new Task(req.body);

        const taskSaved = await newtask.save();
        return res.status(201).json(taskSaved);
    } catch (error) {
        console.log(error);
        return res.status(400).json("error");
    }
}

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newTask = new Task(req.body);

        newTask._id = id;

        const taskUpdated = await Task.findByIdAndUpdate(id, newTask, { 
            new: true,
        });

        return res.status(200).json(taskUpdated);

    } catch (error) {
        return res.status(400).json("error");
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskDeleted = await Task.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Elemento eliminado",
            elemento: taskDeleted
        })
    } catch (error) {
        return res.status(400),json("error");
    }
}

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask
}