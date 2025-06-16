import { Request, Response, NextFunction, RequestHandler } from "express";
import { getDB, ObjectId } from "../db";
import { User } from "../types/User";
import { findUserById } from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = await getDB();
    const users = await db
      .collection<User>("users")
      .find({})
      .project({ password: 0 })
      .toArray();
    res.status(200).json({
      message: "Successfully fetched the user list",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserDetailsById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(new ObjectId(req.params.id));

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Successfully fetched the user",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
