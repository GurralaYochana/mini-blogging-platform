import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as authApi from "../api/auth";
import { mockContextData, mockUsersData } from "../test/mockData";
import { Ctx } from "../contexts/AuthContext";
import UsersPage from "./UsersPage";

vi.mock("../../api/axios");

describe("Home", () => {
  it("renders posts from /api/posts", async () => {
    vi.spyOn(authApi, "getUsers").mockResolvedValueOnce({
      data: mockUsersData,
    } as any);

    render(
      <MemoryRouter>
        <Ctx.Provider value={mockContextData}>
          <UsersPage />
        </Ctx.Provider>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByTestId("all-users-title")).toBeInTheDocument();
      mockUsersData.map((user) => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });
  });
});
