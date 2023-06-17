import { AppActions } from "src/actions";
import { AUTHENTICATE } from "src/actions/authenticate";
import { Authenticated, Unauthenticated, unauthenticated } from "src/types/authenticate";

export interface AppState {
    authStatus: Authenticated | Unauthenticated
}

export const initialState: AppState = {
    authStatus: unauthenticated
}


export const appReducer = (state: AppState = initialState, action: AppActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, authStatus: action.payload };
    default:
      return state;
  }
}