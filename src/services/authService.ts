import type { LoginRequest, LoginResponse } from "../auth/authTypes";

const AUTH_API_BASE_URL = "http://localhost:8085/api/auth";

export const authService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    console.log("AUTH API REQUEST:", request);

    const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    console.log("AUTH API RESPONSE:", response.status);

    if (!response.ok) {
      const body = await response.text();

      console.error("Authentication failed:", {
        status: response.status,
        body,
      });

      throw new Error(`Login failed: ${response.status}`);
    }

    const loginResponse = (await response.json()) as LoginResponse;

    localStorage.setItem("token", loginResponse.token);

    return loginResponse;
  },
};
