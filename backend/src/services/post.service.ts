import { ObjectId } from "mongodb";
import { getDB } from "../db";
import { Post } from "../types/Post";

const coll = () => getDB().collection<Post>("posts");

export const create = async (post: Post) => {
  const now = new Date();
  const doc = { ...post, createdAt: now, updatedAt: now };
  const res = await coll().insertOne(doc);
  return { ...doc, _id: res.insertedId };
};

/**
 * Update a post by ID and author. Returns the updated post, or null if not found.
 */
export const update = async (
  id: ObjectId,
  authorId: ObjectId,
  blogTitle: string,
  blogContent: string
): Promise<Post | null> => {
  const result = await coll().findOneAndUpdate(
    { _id: id, authorId },
    { $set: { blogTitle, blogContent, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return result ?? null;
};

export const findById = async (id: ObjectId) => {
  return await coll().findOne({ _id: id }); // returns Post | null
};

export const findPostWithAuthor = async (id: ObjectId) => {
  return await coll()
    .aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      { $project: { "author.password": 0 } }, // strip password hash
    ])
    .toArray();
};

export const postsByUser = async (userId: ObjectId) => {
  return coll()
    .aggregate([
      { $match: { authorId: userId } },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
          pipeline: [{ $project: { name: 1, username: 1, email: 1 } }],
        },
      },
      { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
      { $sort: { createdAt: -1 } },
    ])
    .toArray();
};
