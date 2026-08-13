import { environment } from "../config/environment";
import type { LoginRequest, LoginResponse } from "../auth/authTypes";

export const authService = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${environment.authApiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const loginResponse = (await response.json()) as LoginResponse;
    return loginResponse;
  },
};
