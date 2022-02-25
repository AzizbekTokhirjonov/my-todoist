import express from "express";
import ProjectModel from "./scheme.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
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
      path: "tasks projectOwner collaborators sections",
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
    next(
      createHttpError(404, "section with id: " + req.params.id + " not found")
    );
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

//SECTIONS
router.post("/:id/sections", async (req, res, next) => {
  try {
    const { section } = req.body;
    const modifiedProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          sections: req.body,
        },
      },
      { new: true }
    );
    if (modifiedProject) {
      res.send(modifiedProject);
    }
    next(
      createHttpError(404, "section with id: " + req.params.id + " not found")
    );
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});

router.get("/:projectId/section", async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    res.send(project.sections);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId/section/:sectionId", async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    const sections = project.sections;
    const section = sections.find(
      (c) => c._id.toString() === req.params.sectionId.toString()
    );
    res.send(section);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/sections/:sectionId", async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      res
        .status(404)
        .send({ message: `project with ${req.params.id} is not found` });
    } else {
      const sectionIndex = project.sections.findIndex(
        (section) => section._id.toString() === req.params.sectionId
      );
      if (sectionIndex === -1) {
        res.status(404).send({
          message: `section with ${req.params.sectionId} is not found!`,
        });
      } else {
        project.sections[sectionIndex] = {
          ...project.sections[sectionIndex]._doc,
          ...req.body,
        };
        await project.save();
        res.status(204).send(project);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});
router.put("/:id/sections/:sectionId", async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      res
        .status(404)
        .send({ message: `project with ${req.params.id} is not found` });
    } else {
      const { _id } = req.body;
      const criteria = {
        _id: req.params.id,
        "sections._id": new mongoose.Types.ObjectId(_id),
      };
      const isSectionExists = await ProjectModel.findOne(criteria);
      console.log("Section exists: ", isSectionExists);
      if (isSectionExists) {
        await ProjectModel.findByIdAndUpdate(criteria, {
          $pull: {
            sections: {
              _id: new mongoose.Types.ObjectId(_id),
            },
          },
        });
      }
      // const sectionIndex = project.sections.findIndex(
      //   (section) => section._id.toString() === req.params.sectionId
      // );
      // if (sectionIndex === -1) {
      //   res.status(404).send({
      //     message: `section with ${req.params.sectionId} is not found!`,
      //   });
      // } else {
      //   project.sections[sectionIndex] = {
      //     ...project.sections[sectionIndex]._doc,
      //     ...req.body,
      //   };
      //   await project.save();
      //   res.status(204).send(project);
      // }
    }
  } catch (error) {
    console.log(error);
    res.send(500).send({ message: error.message });
  }
});

export default router;
