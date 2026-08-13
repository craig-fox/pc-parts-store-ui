export type InventoryResponse = {
    productId: string;
    quantityOnHand: number;
    quantityReserved: number;
    availableQuantity: number;
    status: string;
    lastUpdated: string;
  };