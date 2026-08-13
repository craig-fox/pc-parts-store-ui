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

    console.log("REGISTER RESPONSE STATUS:", response.status);

    const responseBody = await response.text();

    console.log("REGISTER RESPONSE BODY:", responseBody);

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    return JSON.parse(responseBody);
  },
};
