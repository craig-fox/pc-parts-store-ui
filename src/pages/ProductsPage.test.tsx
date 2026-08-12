import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import ProductsPage from "./ProductsPage";
import { getProducts } from "../services/productService";

import type { Product } from "../types/Product";
import { Link, MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "AMD Ryzen 7 7800X3D",
    description: "Gaming CPU",
    category: "CPU",
    price: 699.99,
    weightKg: 0.5,
    imageUrl: "/cpu.jpg",
    brand: "AMD",
    stockQuantity: 10,
    sku: "CPU-7800X3D",
  },
  {
    id: "2",
    name: "NVIDIA GeForce RTX 4070",
    description: "Graphics card",
    category: "GPU",
    price: 999.99,
    weightKg: 1.2,
    imageUrl: "/gpu.jpg",
    brand: "NVIDIA",
    stockQuantity: 5,
    sku: "GPU-4070",
  },
  {
    id: "3",
    name: "Corsair Vengeance 32GB",
    description: "DDR5 memory",
    category: "Memory",
    price: 199.99,
    weightKg: 0.2,
    imageUrl: "/memory.jpg",
    brand: "Corsair",
    stockQuantity: 20,
    sku: "MEM-32GB",
  },
  {
    id: "4",
    name: "Intel Core i7-14700K",
    description: "High-performance desktop CPU",
    category: "CPU",
    price: 629.99,
    weightKg: 0.6,
    imageUrl: "/cpu.jpg",
    brand: "Intel",
    stockQuantity: 8,
    sku: "CPU-I7-14700K",
  },
];

function renderProductsPage() {
    return render(
      <MemoryRouter>
        <CartProvider>
          <ProductsPage />
        </CartProvider>
      </MemoryRouter>,
    );
  }

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getProducts).mockResolvedValue(mockProducts);
  });

  it("fetches and displays products", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);
  
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductsPage />
        </CartProvider>
      </MemoryRouter>,
    );
  
    expect(
      await screen.findByRole("heading", { name: "Products" }),
    ).toBeInTheDocument();
  
    expect(
      await screen.findByText("AMD Ryzen 7 7800X3D"),
    ).toBeInTheDocument();
  });

  it("builds the category filter from the catalogue", async () => {
    renderProductsPage();

    await screen.findByText("AMD Ryzen 7 7800X3D");

    const categoryFilter = screen.getByLabelText("Category");

    expect(categoryFilter).toHaveValue("All");

    expect(
      screen.getByRole("option", { name: "All" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "CPU" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "GPU" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Memory" }),
    ).toBeInTheDocument();
  });

  it("filters products by search term", async () => {
    const user = userEvent.setup();

    renderProductsPage();

    await screen.findByText("AMD Ryzen 7 7800X3D");

    const searchInput = screen.getByLabelText("Search");

    await user.type(searchInput, "Ryzen");

    expect(
      screen.getByText("AMD Ryzen 7 7800X3D"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("NVIDIA GeForce RTX 4070"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Corsair Vengeance 32GB"),
    ).not.toBeInTheDocument();
  });

  it("filters products by category", async () => {
    const user = userEvent.setup();

    renderProductsPage();

    await screen.findByText("AMD Ryzen 7 7800X3D");

    await user.selectOptions(
      screen.getByLabelText("Category"),
      "GPU",
    );

    expect(
      screen.getByText("NVIDIA GeForce RTX 4070"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("AMD Ryzen 7 7800X3D"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Corsair Vengeance 32GB"),
    ).not.toBeInTheDocument();
  });

  it("sorts products by price", async () => {
    const user = userEvent.setup();
    renderProductsPage();

    await screen.findByText("AMD Ryzen 7 7800X3D");

    await user.selectOptions(
      screen.getByLabelText("Sort By"),
      "priceAsc",
    );

    const productNames = screen
      .getAllByRole("heading")
      .map((heading) => heading.textContent);

    expect(productNames).toEqual([
    "Products",
    "Corsair Vengeance 32GB",
    "Intel Core i7-14700K",
    "AMD Ryzen 7 7800X3D",
    "NVIDIA GeForce RTX 4070",
    ]);
  });

  it("updates the product count when filters are applied", async () => {
    const user = userEvent.setup();
  
    renderProductsPage();
  
    await screen.findByText("AMD Ryzen 7 7800X3D");
  
    expect(screen.getByText("4")).toBeInTheDocument();
  
    await user.selectOptions(
      screen.getByLabelText("Category"),
      "GPU",
    );
  
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("displays the empty state when no products match the filters", async () => {
    const user = userEvent.setup();

    renderProductsPage();

    await screen.findByText("AMD Ryzen 7 7800X3D");

    await user.type(
      screen.getByLabelText("Search"),
      "nonexistent product",
    );

    expect(
      screen.getByText("No products found"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Try adjusting your search or filters."),
    ).toBeInTheDocument();
  });

  it("can render a router link", () => {
    render(
      <MemoryRouter>
        <Link to="/test">Test link</Link>
      </MemoryRouter>,
    );
  
    expect(screen.getByRole("link", { name: "Test link" })).toHaveAttribute(
      "href",
      "/test",
    );
  });
});

