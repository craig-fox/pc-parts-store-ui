import { environment } from "../config/environment";
import type { InventoryResponse } from "../types/InventoryResponse";
import { authenticatedFetch } from "./api";

export const inventoryService = {
  async getInventory(productId: string): Promise<InventoryResponse> {
    const response = await authenticatedFetch(
      `${environment.inventoryApiBaseUrl}/${productId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to get inventory: ${response.status}`);
    }

    return response.json();
  },

  async reserveStock(
    productId: string,
    quantity: number,
  ): Promise<InventoryResponse> {
    const response = await authenticatedFetch(
      `${environment.inventoryApiBaseUrl}/${productId}/reserve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to reserve inventory: ${response.status}`);
    }

    return response.json();
  },

  async releaseStock(
    productId: string,
    quantity: number,
  ): Promise<InventoryResponse> {
    const response = await authenticatedFetch(
      `${environment.inventoryApiBaseUrl}/${productId}/release`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to release inventory: ${response.status}`);
    }

    return response.json();
  },

  async confirmStock(
    productId: string,
    quantity: number,
  ): Promise<InventoryResponse> {
    const response = await authenticatedFetch(
      `${environment.inventoryApiBaseUrl}/${productId}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to confirm inventory: ${response.status}`);
    }

    return response.json();
  },
};
