import express from "express";
import TaskModel from "./scheme.js";
import createHttpError from "http-errors";
import { requireAuth } from "../../middleware/authMiddleware.js";
import UserModel from "../users/scheme.js";
import mongoose from "mongoose";
const router = express.Router();

//Create task
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const newTaskInput = req.body;
    const newTask = new TaskModel(newTaskInput);
    const savedTask = await newTask.save();
    res.send(savedTask);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user);
    const tasks = await TaskModel.find().populate({ path: "label" });
    const filteredTasks = tasks.filter((task) => {
      const taskOwner = task.owner.toString();
      const userId = user._id;
      const watchers = task.watchers.map((watcher) => watcher.toString());
      if (taskOwner === userId || watchers.includes(userId)) {
        return task;
      }
    });

    res.send(filteredTasks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const modifiedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (modifiedTask) {
      res.send(modifiedTask);
    }
    {
      next(
        createHttpError(404, "Task with id: " + req.params.id + " not found")
      );
    }
    res.send(modifiedTask);
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
