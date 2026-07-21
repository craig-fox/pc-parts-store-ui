import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { describe, it, expect } from "vitest";

describe("NotFoundPage", () => {
  it("renders the 404 message", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();

    expect(screen.getByText(/couldn't find that page/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
