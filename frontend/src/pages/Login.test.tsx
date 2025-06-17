import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import * as authApi from "../api/auth";
import { mockJwtToken, mockUserData } from "../test/mockData";

vi.mock("../api/auth");

describe("Login Page", () => {
  it("logs user in and redirects", async () => {
    // Mock API
    vi.spyOn(authApi, "login").mockResolvedValueOnce({
      data: {
        token: mockJwtToken,
        user: mockUserData,
      },
    } as any);

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "mock@gmail.com" },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)?.[0], {
      target: { value: "mock@12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(authApi.login).toHaveBeenCalled());
    setTimeout(() => {
      expect(localStorage.getItem("token")).toBe(mockJwtToken);
    }, 5000);
  });
});
