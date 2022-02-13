import express from "express";
import TaskModel from "./scheme.js";
import createHttpError from "http-errors";

const router = express.Router();

//Create task
router.post("/", async (req, res, next) => {
  try {
    const newTaskInput = req.body;
    const newTask = new TaskModel(newTaskInput);
    const { _id } = await newTask.save();
    res.send(newTask);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await TaskModel.find();
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
