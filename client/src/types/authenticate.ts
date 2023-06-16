export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface Unauthenticated {
  type: "unauthenticated";
}

export interface Authenticated {
  type: "authenticated";
}

export type AuthStatus = Authenticated | Unauthenticated;

export const authenticated: Authenticated = { type: "authenticated" };
export const unauthenticated: Unauthenticated = { type: "unauthenticated" };
export const isAuthenticated = (val: AuthStatus): boolean =>
  val.type === "authenticated";
