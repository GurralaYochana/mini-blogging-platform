import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { mockContextData, mockJwtToken, mockPosts } from "../test/mockData";
import { Ctx } from "../contexts/AuthContext";
import * as postsApi from "../api/post";

vi.mock("../../api/axios");

describe("Home", () => {
  it("renders posts from /api/posts", async () => {
    vi.spyOn(postsApi, "getPostsList").mockResolvedValueOnce({
      data: mockPosts,
    } as any);

    render(
      <MemoryRouter>
        <Ctx.Provider value={{ ...mockContextData, token: mockJwtToken }}>
          <Home />
        </Ctx.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByTestId("latest-posts-title")).toBeInTheDocument();
      mockPosts.map((post) => {
        expect(screen.getByText(post.blogTitle)).toBeInTheDocument();
        expect(screen.getByText(post.blogContent)).toBeInTheDocument();
      });
    });
  });
});
