import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import { mockJwtToken } from "../test/mockData";

function renderNav(token: string | null) {
  localStorage.setItem("token", token ?? "");
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Navbar toggleTheme={() => {}} />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  it("shows Login/Sign Up when logged out", () => {
    renderNav(null);
    expect(screen.getByTestId("login-icon")).toBeInTheDocument();
    expect(screen.getByTestId("sign-up-icon")).toBeInTheDocument();
  });

  it("shows New Post & Logout when logged in", () => {
    renderNav(mockJwtToken);
    expect(screen.getByTestId("add-post-icon")).toBeInTheDocument();
    expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
  });
});
