import api from "./axios";

export type PostReqBodyType = {
  blogTitle: string;
  blogContent: string;
};

export const createPost = (reqBody: PostReqBodyType) =>
  api.post("/posts", reqBody);
export const updatePost = (id: string, reqBody: PostReqBodyType) =>
  api.put(`/posts/${id}`, reqBody);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const listUserPosts = (userId: string) =>
  api.get(`/posts/user/${userId}`);
