import { environment } from "../config/environment";
import { authenticatedFetch } from "./api";

export async function testAuthenticatedOrderRequest(orderId: string) {
  const response = await authenticatedFetch(
    `${environment.orderApiBaseUrl}/orders/${orderId}`,
  );

  console.log("Order request status:", response.status);

  if (!response.ok) {
    const body = await response.text();

    console.error("Order request failed:", {
      status: response.status,
      body,
    });

    throw new Error(`Order request failed: ${response.status}`);
  }

  return response.json();
}