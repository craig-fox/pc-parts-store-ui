export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
) {
  const token = localStorage.getItem("token");

  console.log("AUTHENTICATED FETCH:", {
    url,
    method: options.method ?? "GET",
    hasToken: !!token,
  });

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}