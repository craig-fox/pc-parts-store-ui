import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrderSummary from "./OrderSummary";
import { formatCurrency } from "../../utils/currency";

describe("OrderSummary", () => {
  it("displays the subtotal, shipping charge and total", () => {
    render(<OrderSummary subtotal={269} shipping={8} total={277} />);

    expect(screen.getByText(formatCurrency(269))).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(8))).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(277))).toBeInTheDocument();
  });

  it("displays express shipping", () => {
    render(<OrderSummary subtotal={269} shipping={15} total={284} />);

    expect(screen.getByText(formatCurrency(15))).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(284))).toBeInTheDocument();
  });
});
