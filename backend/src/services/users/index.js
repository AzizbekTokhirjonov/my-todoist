import express from "express";
import UserModel from "./scheme.js";
import createHttpError from "http-errors";

const router = express.Router();

//Create user
router.post("/signup", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    const newUserInput = req.body;

    const userWithId = users.filter(
      (user) => user.userId === newUserInput.userId
    );
    if (userWithId) {
      const randomNumber = Math.floor(Math.random() * 100);
      console.log(randomNumber);
      newUserInput.userId = `${newUserInput.firstName.slice(0, 1)}${
        newUserInput.lastName
      }${randomNumber}`;
    } else {
      newUserInput.userId = `${newUserInput.firstName.slice(0, 1)}${
        newUserInput.lastName
      }`;
    }
    const newUser = new UserModel(newUserInput);
    const { _id } = await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (modifiedUser) {
      res.send(modifiedUser);
    }
    {
      next(
        createHttpError(404, "User with id: " + req.params.id + " not found")
      );
    }
    res.send(modifiedUser);
  } catch (error) {
    console.log(error);
    createHttpError(400, error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
  }
});
export default router;
