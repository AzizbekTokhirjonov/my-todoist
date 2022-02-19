import express from "express";
import UserModel from "./scheme.js";
import createHttpError from "http-errors";
import {
  createToken,
  handleErrors,
  maxAge,
} from "../../controllers/authControllers.js";
import { requireAuth, checkUser } from "../../middleware/authMiddleware.js";

const router = express.Router();

//Login
router.post("/login", async (req, res, next) => {
  console.log("route hit!");
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: false,
    });

    res.status(200).send({ user: user, token });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
});

//LOGOUT
router.get("/logout", async (req, res, next) => {
  try {
    res.cookie("jwt", { maxAge: 1 });
    res.status(201).send("Please log in");
  } catch (error) {
    console.log(error);
  }
});
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
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find().select("-password");
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
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
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(201).send({});
  } catch (error) {
    console.log(error);
    next(createHttpError(404, { message: error.message }));
  }
});
export default router;
