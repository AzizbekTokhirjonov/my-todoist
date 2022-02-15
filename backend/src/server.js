import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./services/users/index.js";
import tasksRouter from "./services/tasks/index.js";
import sectionsRouter from "./services/sections/index.js";
import projectsRouter from "./services/projects/index.js";
import labelsRouter from "./services/labels/index.js";
import { checkUser } from "./middleware/authMiddleware.js";
const PORT = process.env.PORT || 5000;
const server = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());
server.use("*", checkUser);
server.use("/users", usersRouter);
server.use("/tasks", tasksRouter);
server.use("/sections", sectionsRouter);
server.use("/projects", projectsRouter);
server.use("/labels", labelsRouter);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected");
  server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
