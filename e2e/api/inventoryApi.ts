import type { InventoryResponse } from "../../src/types/InventoryResponse";

const INVENTORY_API_BASE_URL =
  "http://localhost:8084/api/inventory";

export const inventoryApi = {

  async getInventory(
    productId: string,
    token: string,
  ): Promise<InventoryResponse> {

    const response = await fetch(
      `${INVENTORY_API_BASE_URL}/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    token: string,
  ): Promise<InventoryResponse> {

    const response = await fetch(
      `${INVENTORY_API_BASE_URL}/${productId}/reserve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    token: string,
  ): Promise<InventoryResponse> {

    const response = await fetch(
      `${INVENTORY_API_BASE_URL}/${productId}/release`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to release inventory: ${response.status}`);
    }

    return response.json();
  },
};
