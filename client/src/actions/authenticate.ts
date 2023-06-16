import { AuthStatus } from "src/types/authenticate";

export const AUTHENTICATE = "AUTHENTICATE"

export type AuthenticateAction = { type: typeof AUTHENTICATE, payload: AuthStatus }
