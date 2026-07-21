import type { Address } from "./Address";
import type { Customer } from "./Customer";

export type Checkout = {
  customer: Customer;
  shippingAddress: Address;
};
