import express from "express";
import LabelModel from "./scheme.js";
import createHttpError from "http-errors";
import { requireAuth } from "../../middleware/authMiddleware.js";
const router = express.Router();

//Create label
router.post("/", requireAuth, async (req, res, next) => {
  try {
      const user = JSON.parse(req.cookies.user)
      const newLabelInput = req.body;
      const newLabel = new LabelModel({...newLabelInput, owner: user._id});
      const savedLabel = await newLabel.save();
      res.send(savedLabel);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user)
    const labels = await LabelModel.find({owner: user._id});
    res.send(labels);
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
});

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user)
    const label = await LabelModel.findById(req.params.id);

    if(user._id.toString() && label.owner._id.toString()){
      res.send(label);
    } else {
      next(
        createHttpError(404, "You do not have access to this resource")
      );
    }

  } catch (error) {
    console.log(error);
    res.status(404).send({error})
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user)
    const label = await LabelModel.findById(req.params.id);
    if(user._id.toString() && label.owner._id.toString()){
      const modifiedLabel = await LabelModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (modifiedLabel) {
        res.send(modifiedLabel);
      }else{
        next(
          createHttpError(404, "label with id: " + req.params.id + " not found")
        );
      }
    } else {
      next(
        createHttpError(404, "You do not have permission for this operation")
      );
    }
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const user = JSON.parse(req.cookies.user)
    const label = await LabelModel.findById(req.params.id);
    if(user._id.toString() && label.owner._id.toString()){
      const label = await LabelModel.findByIdAndDelete(req.params.id);
      res.status(201).send({label});
    } else {
      next(
        createHttpError(404, "You do not have permission for this operation")
      );
    }
  } catch (error) {
    console.log(error);
    next(
      createHttpError(404, error)
    );
  }
});


export default router;
