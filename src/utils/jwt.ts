function decodeJwtPayload(token: string): unknown {
    const parts = token.split(".");
  
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }
  
    try {
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "=",
      );
  
      return JSON.parse(atob(padded)) as unknown;
    } catch {
      return null;
    }
  }
  
  export function getTokenExpiry(token: string): number | null {
    const payload = decodeJwtPayload(token);
  
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("exp" in payload) ||
      typeof payload.exp !== "number" ||
      !Number.isFinite(payload.exp)
    ) {
      return null;
    }
  
    return payload.exp;
  }
  
  export function isTokenExpired(token: string): boolean {
    const expiry = getTokenExpiry(token);
  
    return expiry === null || expiry <= Math.floor(Date.now() / 1000);
  }