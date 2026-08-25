import { beforeEach, describe, expect, it, vi } from "vitest";

import { authService } from "./authService";
import { environment } from "../config/environment";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe("login", () => {
    it("sends the login request and returns the response", async () => {
      const loginRequest = {
        email: "alice.smith@example.com",
        password: "password123",
      };

      const loginResponse = {
        token: "test-jwt-token",
      };

      const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(loginResponse), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      const result = await authService.login(loginRequest);

      expect(fetchMock).toHaveBeenCalledWith(
        `${environment.apiBaseUrl}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginRequest),
        },
      );

      expect(result).toEqual(loginResponse);
    });

    it("throws when authentication fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response("Invalid credentials", {
          status: 401,
        }),
      );

      await expect(
        authService.login({
          email: "alice.smith@example.com",
          password: "wrong-password",
        }),
      ).rejects.toThrow("Login failed: 401");
    });
  });
});
