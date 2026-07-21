import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Breadcrumbs from "./Breadcrumbs";
import type { Breadcrumb } from "./Breadcrumbs";

function renderBreadcrumbs(items: Breadcrumb[]) {
  render(
    <MemoryRouter>
      <Breadcrumbs items={items} />
    </MemoryRouter>,
  );
}

describe("Breadcrumbs", () => {
  it("renders a single breadcrumb correctly", () => {
    renderBreadcrumbs([{ label: "Home" }]);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders intermediate breadcrumbs as links", () => {
    renderBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "AMD Ryzen 7 9800X3D" },
    ]);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const productsLink = screen.getByRole("link", { name: "Products" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
  });

  it("renders the last breadcrumb as plain text, not a link", () => {
    renderBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "AMD Ryzen 7 9800X3D" },
    ]);

    const lastItem = screen.getByText("AMD Ryzen 7 9800X3D");

    expect(lastItem.tagName).not.toBe("A");
    expect(
      screen.queryByRole("link", { name: "AMD Ryzen 7 9800X3D" }),
    ).not.toBeInTheDocument();
  });

  it("renders separators between breadcrumbs but not after the last item", () => {
    renderBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "AMD Ryzen 7 9800X3D" },
    ]);

    const separators = screen.getAllByText("/");

    expect(separators).toHaveLength(2);
  });

  it("renders no separator when there is only one breadcrumb", () => {
    renderBreadcrumbs([{ label: "Home" }]);

    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });
});
