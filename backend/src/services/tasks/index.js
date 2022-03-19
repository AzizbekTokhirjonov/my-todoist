import express from "express";
import TaskModel from "./scheme.js";
import createHttpError from "http-errors";
import { requireAuth } from "../../middleware/authMiddleware.js";

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

    // TODO : Find way to populate author value inside array of comments in array of tasks
    const tasks = await TaskModel.find().populate({ path: "label" })
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
    res.status(201).send({task});
  } catch (error) {
    console.log(error);
  }
});




// subtasks section
//Create subtask


router.post("/:taskId/subtasks", requireAuth, async (req, res, next) => {
  try {
    const taskId = req.params.taskId
    console.log(`fucking task id`, taskId)
    const task = await TaskModel.findById(taskId)

    if(task){
      const newTaskInput = req.body;
      const user = req.cookies.user
      const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
        $push: {
          subTasks: {...newTaskInput, owner: user._id}
        }
      })
     res.send(updatedTask);
    } else {
      next(
        createHttpError(404, "Task with id: " + req.params.id + " not found")
      );
    }

  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});


router.delete("/:taskId/subtasks/:subTaskId", requireAuth, async (req, res, next) => {
  try {
    const {taskId, subTaskId} = req.params
    const task = await TaskModel.findById(taskId)

    if(task){
      const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
        $pull: {
          subTasks: {_id: subTaskId}
        }
      })
      res.send({updatedTask})
    }else {
      next(
        createHttpError(404, "Task with id: " + req.params.id + " not found")
      );
    }
   
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});




// *******   !!!CAUTION!!! old comments routes from when they were embedded for future reference
// router.post("/:taskId/comments", requireAuth, async (req, res, next) => {
//   try {
//     const taskId = req.params.taskId
//     const task = await TaskModel.findById(taskId)

//     if(task){
//       const commentInput = req.body;
//       const user = req.cookies.user
//       const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
//         $push: {
//           comments: {...commentInput, author: user._id}
//         }
//       })
//      res.send(updatedTask);
//     } else {
//       next(
//         createHttpError(404, "Task with id: " + req.params.id + " not found")
//       );
//     }

//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error });
//   }
// });


// comments section
// router.delete("/:taskId/comments/:commentId", requireAuth, async (req, res, next) => {
//   try {
//     const {taskId, commentId} = req.params
//     const task = await TaskModel.findById(taskId)

//     if(task){
//       const user = req.cookies.user
//       const updatedTask = await TaskModel.updateOne({
//         _id: taskId,
//         comments: {
//           $elemMatch : {
//             author: user._id
//           }
//         }
//       }, {
//         $pull: {
//           comments: {
//             _id: commentId
//           }
//         }
//       })
//      res.send(updatedTask);
//     } else {
//       next(
//         createHttpError(404, "Task with id: " + req.params.id + " not found")
//       );
//     }

//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error });
//   }
// });






export default router;


