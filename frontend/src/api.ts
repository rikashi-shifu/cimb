// Thin API client for the Spring Boot backend. The session token is kept in memory and
// sent as X-Session-Token on every request.

let sessionToken: string | null = null;

export function setToken(token: string | null) {
  sessionToken = token;
}
export function getToken() {
  return sessionToken;
}

export interface ApiError {
  error: string;
  status: number;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (sessionToken) headers["X-Session-Token"] = sessionToken;

  const res = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const err = data as ApiError;
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
};

// ---- typed shapes ----
export interface UserInfo {
  username: string;
  displayName: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface LoginResponse {
  success: boolean;
  mfaRequired: boolean;
  message: string;
  token?: string;
  challengeId?: string;
  demoOtp?: string;
  user?: UserInfo;
}
