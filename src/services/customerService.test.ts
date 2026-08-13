import { beforeEach, describe, expect, it, vi } from "vitest";

import { customerService } from "./customerService";

const mockEnvironment = vi.hoisted(() => ({
  customerApiBaseUrl: "http://localhost:8081/api",
}));

vi.mock("../config/environment", () => ({
  environment: mockEnvironment,
}));

describe("customerService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("registerCustomer", () => {
    it("sends the registration request and returns the response", async () => {
      const request = {
        firstName: "Alice",
        lastName: "Smith",
        preferredName: "Alice",
        email: "alice.smith@example.com",
        address: "123 Example Street",
        password: "password123",
      };

      const customerResponse = {
        id: "11111111-1111-1111-1111-111111111111",
        firstName: "Alice",
        lastName: "Smith",
        preferredName: "Alice",
        email: "alice.smith@example.com",
        address: "123 Example Street",
      };

      const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(customerResponse), {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const result = await customerService.registerCustomer(request);

      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:8081/api/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        },
      );

      expect(result).toEqual(customerResponse);
    });

    it("throws when registration fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response("Email already exists", {
          status: 409,
        }),
      );

      await expect(
        customerService.registerCustomer({
          firstName: "Alice",
          lastName: "Smith",
          preferredName: "Alice",
          email: "alice.smith@example.com",
          address: "123 Example Street",
          password: "password123",
        }),
      ).rejects.toThrow("Registration failed: 409");
    });
  });
});
