import express from "express";
import LabelModel from "./scheme.js";
import createHttpError from "http-errors";

const router = express.Router();

//Create label
router.post("/", async (req, res, next) => {
  try {
    const newLabelInput = req.body;
    const newLabel = new LabelModel(newLabelInput);
    const { _id } = await newLabel.save();
    res.send(newLabel);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const labels = await LabelModel.find();
    res.send(labels);
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const label = await LabelModel.findById(req.params.id);
    res.send(label);
  } catch (error) {
    console.log(error);
    res.status(404).send({error})
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedLabel = await LabelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (modifiedLabel) {
      res.send(modifiedLabel);
    }else
    {
      next(
        createHttpError(404, "label with id: " + req.params.id + " not found")
      );
    }
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const label = await LabelModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
