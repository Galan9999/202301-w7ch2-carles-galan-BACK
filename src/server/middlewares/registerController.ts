import {
  type Request,
  type NextFunction,
  type Response,
  request,
} from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserCredentials } from "../../types";

export const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.create({ username, password, email });

    res.status(201).json({ user });
  } catch (error) {
    const newError = new CustomError(
      error.message,
      408,
      "Coudldn't create user"
    );

    next(newError);
  }
};
