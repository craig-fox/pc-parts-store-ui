import type { Address } from "./Address";
import type { Customer } from "./Customer";

export type ShippingMethod = "STANDARD" | "EXPRESS";

export type Checkout = {
  customer: Customer;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
};
