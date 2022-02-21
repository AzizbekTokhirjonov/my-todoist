import express from "express";
import ProjectModel from "./scheme.js";
import createHttpError from "http-errors";

const router = express.Router();

//Create section
router.post("/", async (req, res, next) => {
  try {
    const newProjectInput = req.body;
    const newProject = new ProjectModel(newProjectInput);
    const { _id } = await newProject.save();
    res.send(newProject);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user);
    const projects = await ProjectModel.find().populate({
      path: "tasks projectOwner collaborators",
    });
    const filteredProjects = projects.filter((project) => {
      const projectOwner = project.projectOwner._id.toString();
      const userId = user._id;
      const collaborators = project.collaborators.map((collaborator) =>
        collaborator.toString()
      );
      if (projectOwner === userId || collaborators.includes(userId)) {
        return project;
      }
    });
    res.send(filteredProjects);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id).populate({
      path: "tasks projectOwner collaborators",
    });

    res.send(project);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (modifiedProject) {
      res.send(modifiedProject);
    }
    {
      next(
        createHttpError(404, "section with id: " + req.params.id + " not found")
      );
    }
    res.send(modifiedProject);
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
