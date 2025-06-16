import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userSvc from "../services/user.service";
import { ObjectId } from "../db";

const sign = (id: ObjectId) =>
  jwt.sign({ id: id.toString() }, process.env.JWT_SECRET!, { expiresIn: "7d" });

export const register: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body ?? {};

  const existing = await userSvc.findByEmail(email);
  if (existing) {
    res.status(409).json({ error: "Email exists" });
    return; // stop here
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userSvc.create({
    username,
    email,
    password: hash,
  });
  const response = {
    token: sign(user._id!),
    user: { _id: user._id, username, email },
  };
  res.status(201).json({
    message: "Successfully registered",
    data: response,
  });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await userSvc.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const response = {
    token: sign(user._id!),
    user: { _id: user._id, username: user.username, email },
  };
  res.json({
    message: "Logged-in successfully",
    data: response,
  });
};
