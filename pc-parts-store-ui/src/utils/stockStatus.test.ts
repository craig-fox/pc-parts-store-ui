import { describe, expect, it } from "vitest";

import { getStockStatus } from "./stockStatus";

describe("getStockStatus", () => {
    it.each`
        stockQuantity | expected
        ${0}          | ${"OUT_OF_STOCK"}
        ${1}          | ${"LOW_STOCK"}
        ${5}          | ${"LOW_STOCK"}
        ${6}          | ${"IN_STOCK"}
        ${100}        | ${"IN_STOCK"}
    `(
        "returns $expected for stockQuantity=$stockQuantity",
        ({ stockQuantity, expected }) => {
            expect(getStockStatus(stockQuantity)).toBe(expected);
        }
    );
});