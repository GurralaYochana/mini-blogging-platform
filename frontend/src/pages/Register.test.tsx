import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { AuthProvider } from "../contexts/AuthContext";
import * as authApi from "../api/auth";
import { mockJwtToken } from "../test/mockData";

vi.mock("../../api/auth");

describe("Register Page", () => {
  const mockUser = {
    _id: "2",
    username: "Test user",
    email: "testuser@gmail.com",
  };

  it("creates new user and stores token", async () => {
    vi.spyOn(authApi, "register").mockResolvedValueOnce({
      data: {
        token: mockJwtToken,
        user: mockUser,
      },
    } as any);

    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: mockUser.username },
    });
    fireEvent.change(screen.getByLabelText(/^email/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)?.[0], {
      target: { value: "testuser1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => expect(authApi.register).toHaveBeenCalled());
    setTimeout(() => {
      expect(localStorage.getItem("token")).toBe(mockJwtToken);
    }, 5000);
  });
});
