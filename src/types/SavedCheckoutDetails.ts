import type { ShippingAddress } from "./ShippingAddress";

export interface SavedCheckoutDetails {
  firstName: string;
  lastName: string;
  email: string;
  shippingAddress: ShippingAddress;
}
