import { environment } from "../config/environment";
import type { CustomerResponse } from "../types/CustomerResponse";
import type { RegistrationRequest } from "../types/RegistrationRequest";

export const customerService = {
  async registerCustomer(
    request: RegistrationRequest,
  ): Promise<CustomerResponse> {
    const response = await fetch(
      `${environment.customerApiBaseUrl}/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      },
    );

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    return response.json();
  },
};
