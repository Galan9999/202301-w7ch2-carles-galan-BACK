import { Router } from "express";
import multer from "multer";
import loginUser from "../controllers/usersControllers.js";
import { createUser } from "../middlewares/registerController.js";
import storage from "../storage/storage.js";

const usersRouter = Router();
const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/register", upload.single("image"), createUser);

export default usersRouter;
