import { AppActions } from "src/actions";
import { SEARCH_BOOKS } from "src/actions/book";

export interface BooksState {
  search: string;
  search_fields: string[];
}

export const bookState: BooksState = { search: '', search_fields: [] };

export const bookReducer = (
  state: BooksState = bookState,
  action: AppActions
) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {
        ...state,
        search: action.payload.search,
        search_fields: action.payload.search_fields,
      };

    default:
      return state;
  }
};
