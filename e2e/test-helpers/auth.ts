import { expect, type Page } from "@playwright/test";

export interface E2ECustomer {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  address: string;
  password: string;
}

export function createE2ECustomer(): E2ECustomer {
  return {
    firstName: "E2E",
    lastName: "Checkout",
    preferredName: "E2E",
    email: `e2e-checkout-${Date.now()}@example.com`,
    address: "1 Main Street",
    password: "password123",
  };
}

const API_BASE_URL = "http://localhost:8080";

export async function registerCustomer(page: Page, customer: E2ECustomer) {
  await page.goto("/register");

  await expect(
    page.getByRole("heading", { name: "Register an Account" }),
  ).toBeVisible();

  await page.getByLabel("First Name").fill(customer.firstName);
  await page.getByLabel("Last Name").fill(customer.lastName);
  await page.getByLabel("Preferred Name").fill(customer.preferredName);
  await page.getByLabel("Email").fill(customer.email);
  await page.getByLabel("Address").fill(customer.address);
  await page.getByLabel("Password").fill(customer.password);

  await page.getByRole("button", { name: /register/i }).click();

  await expect(page).toHaveURL(/\/login$/);
}

export async function loginAsCustomer(
  page: Page,
  email: string,
  password: string,
) {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/products$/);
}

export async function registerCustomerViaApi(customer: E2ECustomer) {
  const response = await fetch(`${API_BASE_URL}/api/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: customer.firstName,
      lastName: customer.lastName,
      preferredName: customer.preferredName,
      email: customer.email,
      address: customer.address,
      password: customer.password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Registration failed: ${response.status}`);
  }
}

export async function loginCustomerViaApi(
  email: string,
  password: string,
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const loginResponse = await response.json();

  return loginResponse.token;
}

export async function createAuthenticatedE2ECustomer(): Promise<{
  customer: E2ECustomer;
  token: string;
}> {
  const customer = createE2ECustomer();

  await registerCustomerViaApi(customer);

  const token = await loginCustomerViaApi(customer.email, customer.password);

  return { customer, token };
}
