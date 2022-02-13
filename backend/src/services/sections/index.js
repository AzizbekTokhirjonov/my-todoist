import express from "express";
import SectionModel from "./scheme.js";
import createHttpError from "http-errors";

const router = express.Router();

//Create section
router.post("/", async (req, res, next) => {
  try {
    const newSectionInput = req.body;
    const newSection = new SectionModel(newSectionInput);
    const { _id } = await newSection.save();
    res.send(newSection);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const sections = await SectionModel.find().populate({
      path: "tasks",
    });
    res.send(sections);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const section = await SectionModel.findById(req.params.id).populate({
      path: "tasks",
    });

    res.send(section);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedSection = await SectionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (modifiedSection) {
      res.send(modifiedSection);
    }
    {
      next(
        createHttpError(404, "section with id: " + req.params.id + " not found")
      );
    }
    res.send(modifiedSection);
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const section = await SectionModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
