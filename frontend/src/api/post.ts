import api from "./axios";

export const createPost = (blogContent: string) =>
  api.post("/posts", { blogContent });
export const updatePost = (id: string, blogContent: string) =>
  api.put(`/posts/${id}`, { blogContent });
export const deletePost = (id: string) => api.delete(`/posts/${id}`);
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const listUserPosts = (userId: string) =>
  api.get(`/posts/user/${userId}`);
