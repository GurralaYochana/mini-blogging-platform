import { ObjectId } from "mongodb";
import { getDB } from "../db";
import { User } from "../types/User";

const coll = () => getDB().collection<User>("users");

export const findByEmail = async (email: string) => {
  return coll().findOne({ email });
};

export const create = async (user: User) => {
  const now = new Date();
  const doc = { ...user, createdAt: now };
  const res = await coll().insertOne(doc);
  return { ...doc, _id: res.insertedId };
};

export const findUserById = async (userId: ObjectId) => {
  return coll().findOne({ _id: userId }, { projection: { password: 0 } });
};
