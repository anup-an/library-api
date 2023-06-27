import { AppActions } from "src/actions";
import { AUTHENTICATE } from "src/actions/authenticate";
import {
    AuthStatus,
  unauthenticated,
} from "src/types/authenticate";


export type AuthState = AuthStatus;

export const authState = unauthenticated;

export const authReducer = (state: AuthState, action: AppActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      return action.payload;
    default:
      return state;
  }
};
