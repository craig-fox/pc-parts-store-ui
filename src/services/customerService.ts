import { environment } from "../config/environment";
import type { CustomerResponse } from "../types/CustomerResponse";
import type { RegistrationRequest } from "../types/RegistrationRequest";

export const customerService = {
  async registerCustomer(
    request: RegistrationRequest,
  ): Promise<CustomerResponse> {
    const response = await fetch(`${environment.apiBaseUrl}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const responseBody = await response.text();

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    return JSON.parse(responseBody);
  },
};
