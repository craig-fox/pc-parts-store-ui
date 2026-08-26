import { test as base } from "@playwright/test";
import { inventoryApi } from "../api/inventoryApi";
import { testProductLookup } from "../test-data/testProductLookup";
import { loginCustomerViaApi } from "../test-helpers/auth";

const Ryzen = testProductLookup.Ryzen9800X3D;
const Rtx = testProductLookup.Rtx5070Ti;

async function resetInventory(
  productId: string,
  expectedQuantityOnHand: number,
  token: string,
) {
  const inventory = await inventoryApi.getInventory(productId, token);

  if (inventory.quantityReserved > 0) {
    await inventoryApi.releaseStock(
      productId,
      inventory.quantityReserved,
      token,
    );
  }

  const reset = await inventoryApi.getInventory(productId, token);

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
    const token = await loginCustomerViaApi(
      process.env.E2E_EMAIL!,
      process.env.E2E_PASSWORD!,
    );

    await resetInventory(Ryzen.id, 15, token);
    await resetInventory(Rtx.id, 6, token);

    await use(page);
  },
});

export { expect } from "@playwright/test";
