import { Router } from "express";
import loginUser from "../controllers/usersControllers.js";
import { createUser } from "../middlewares/registerController.js";

const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", createUser);

export default usersRouter;
