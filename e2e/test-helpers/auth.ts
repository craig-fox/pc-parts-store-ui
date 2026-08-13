import { expect, type Page } from "@playwright/test";

export interface E2ECustomer {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  address: string;
  password: string;
}

type TestUser = {
  email: string;
  password: string;
};

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
