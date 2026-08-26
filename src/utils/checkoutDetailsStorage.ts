import type { SavedCheckoutDetails } from "../types/SavedCheckoutDetails";

export const CHECKOUT_DETAILS_STORAGE_KEY = "pc-parts-store.checkout-details";

export function getSavedCheckoutDetails(): SavedCheckoutDetails | null {
  const stored = localStorage.getItem(CHECKOUT_DETAILS_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as SavedCheckoutDetails;
  } catch {
    localStorage.removeItem(CHECKOUT_DETAILS_STORAGE_KEY);
    return null;
  }
}

export function saveCheckoutDetails(details: SavedCheckoutDetails): void {
  localStorage.setItem(CHECKOUT_DETAILS_STORAGE_KEY, JSON.stringify(details));
}
