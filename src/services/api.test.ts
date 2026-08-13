import { beforeEach, describe, expect, it, vi } from "vitest";

import { authenticatedFetch } from "./api";

describe("authenticatedFetch", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("calls fetch with the supplied URL", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/products");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/api/products",
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    );
  });

  it("does not add an Authorization header when no token exists", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/products");

    const [, options] = fetchMock.mock.calls[0];

    const headers = new Headers(options?.headers);

    expect(headers.has("Authorization")).toBe(false);
  });

  it("adds the bearer token when a token exists", async () => {
    localStorage.setItem("token", "test-token");

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/orders");

    const [, options] = fetchMock.mock.calls[0];

    const headers = new Headers(options?.headers);

    expect(headers.get("Authorization")).toBe("Bearer test-token");
  });

  it("preserves existing headers", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/orders", {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": "test-value",
      },
    });

    const [, options] = fetchMock.mock.calls[0];

    const headers = new Headers(options?.headers);

    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("X-Custom-Header")).toBe("test-value");
  });

  it("preserves the supplied request options", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/orders", {
      method: "POST",
      body: JSON.stringify({ productId: "123" }),
    });

    const [, options] = fetchMock.mock.calls[0];

    expect(options?.method).toBe("POST");
    expect(options?.body).toBe(JSON.stringify({ productId: "123" }));
  });

  it("uses the stored token instead of an existing Authorization header", async () => {
    localStorage.setItem("token", "current-token");

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/orders", {
      headers: {
        Authorization: "Bearer old-token",
      },
    });

    const [, options] = fetchMock.mock.calls[0];

    const headers = new Headers(options?.headers);

    expect(headers.get("Authorization")).toBe("Bearer current-token");
  });

  it("preserves headers supplied as an array", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    await authenticatedFetch("https://example.com/api/orders", {
      headers: [["X-Custom-Header", "test-value"]],
    });

    const [, options] = fetchMock.mock.calls[0];

    const headers = new Headers(options?.headers);

    expect(headers.get("X-Custom-Header")).toBe("test-value");
  });
});
