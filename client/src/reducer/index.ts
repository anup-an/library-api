import { AppActions } from "src/actions";
import { BooksState, bookReducer, bookState } from "src/reducer/book";
import { AuthState, authReducer, authState } from "src/reducer/authenticate";

export interface AppState {
  authStatus: AuthState;
  book: BooksState;
}

export const initialState: AppState = {
  book: bookState,
  authStatus: authState,
};

export const appReducer = (
  state: AppState = initialState,
  action: AppActions
) => {
  state = {
    ...state,
    authStatus: authReducer(state.authStatus, action),
    book: bookReducer(state.book, action),
  };
  return state;
};
