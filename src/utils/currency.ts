import type { Currency } from "../types/Currency";

const DEFAULT_LOCALE: Record<Currency, string> = {
  NZD: "en-NZ",
  AUD: "en-AU",
  USD: "en-US",
};

export function formatCurrency(
  amount: number,
  currency: Currency = "NZD",
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE[currency], {
    style: "currency",
    currency,
  }).format(amount);
}
