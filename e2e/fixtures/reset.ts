import { test as base } from "@playwright/test";
import { inventoryApi } from "../api/inventoryApi";
import { testProductLookup } from "../test-data/testProductLookup";

const Ryzen = testProductLookup.Ryzen9800X3D;
const Rtx = testProductLookup.Rtx5070Ti;

async function resetInventory(
  productId: string,
  expectedQuantityOnHand: number,
) {
  const inventory = await inventoryApi.getInventory(productId);

  if (inventory.quantityReserved > 0) {
    await inventoryApi.releaseStock(productId, inventory.quantityReserved);
  }

  const reset = await inventoryApi.getInventory(productId);

  if (
    reset.quantityOnHand !== expectedQuantityOnHand ||
    reset.quantityReserved !== 0
  ) {
    throw new Error(
      `Inventory reset failed for ${productId}: ` +
        `expected ${expectedQuantityOnHand} on hand and 0 reserved, ` +
        `got ${reset.quantityOnHand} on hand and ${reset.quantityReserved} reserved`,
    );
  }
}

export const test = base.extend({
  page: async ({ page }, use) => {
    await resetInventory(Ryzen.id, 15);
    await resetInventory(Rtx.id, 6);

    await use(page);
  },
});

export { expect } from "@playwright/test";
