import { beforeEach, describe, expect, it } from "vitest";

import {
  CHECKOUT_DETAILS_STORAGE_KEY,
  getSavedCheckoutDetails,
  saveCheckoutDetails,
} from "./checkoutDetailsStorage";

import type { SavedCheckoutDetails } from "../types/SavedCheckoutDetails";

const checkoutDetails: SavedCheckoutDetails = {
  firstName: "Craig",
  lastName: "Fox",
  email: "craig@example.com",
  shippingAddress: {
    addressLine1: "1 Main St",
    city: "Auckland",
    postcode: "1010",
    country: "NZ",
  },
};

describe("checkoutDetailsStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no checkout details have been saved", () => {
    expect(getSavedCheckoutDetails()).toBeNull();
  });

  it("saves checkout details", () => {
    saveCheckoutDetails(checkoutDetails);

    expect(localStorage.getItem(CHECKOUT_DETAILS_STORAGE_KEY)).toBe(
      JSON.stringify(checkoutDetails),
    );
  });

  it("retrieves saved checkout details", () => {
    localStorage.setItem(
      CHECKOUT_DETAILS_STORAGE_KEY,
      JSON.stringify(checkoutDetails),
    );

    expect(getSavedCheckoutDetails()).toEqual(checkoutDetails);
  });

  it("returns null and removes invalid stored data", () => {
    localStorage.setItem(CHECKOUT_DETAILS_STORAGE_KEY, "not valid json");

    expect(getSavedCheckoutDetails()).toBeNull();

    expect(localStorage.getItem(CHECKOUT_DETAILS_STORAGE_KEY)).toBeNull();
  });
});
