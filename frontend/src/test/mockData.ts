import { vi } from "vitest";

export const mockJwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGVhYjRhMzMxNjNjMWRkOWVjNGU0MyIsImlhdCI6MTc1MDA4MDMyMywiZXhwIjoxNzUwNjg1MTIzfQ.yfHZF20upFz6vFwTfz85NNTq2mBR0pTRcETN1AmOKec";

export const mockContextData = {
  token: "",
  setToken: () => vi.fn(),
  successMsg: "",
  setSuccessMsg: () => vi.fn(),
  errorMsg: "",
  setErrorMsg: () => vi.fn(),
  userId: "",
  setUserId: () => vi.fn(),
};

export const mockUsersData = [
  {
    _id: "1",
    username: "Test User 1",
    email: "mock@gmail.com",
  },
  {
    _id: "1",
    username: "Test User 2",
    email: "mock1@gmail.com",
  },
];

export const mockPosts = [
  {
    _id: "1",
    blogTitle: "blog title one",
    blogContent: "blog content one",
    createdAt: "2025-06-15T11:39:17.449Z",
    updatedAt: "2025-06-15T11:39:17.449Z",
    author: mockUsersData[0],
  },
  {
    _id: "2",
    blogTitle: "blog title two",
    blogContent: "blog content two",
    createdAt: "2025-06-15T11:06:31.863Z",
    updatedAt: "2025-06-15T11:09:20.432Z",
    author: mockUsersData[1],
  },
];
