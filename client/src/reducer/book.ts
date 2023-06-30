import { AppActions } from "src/actions";
import { SEARCH_BOOKS } from "src/actions/book";
import { FilterQuery } from "src/types/common";

export interface BooksState {
  search: string;
  search_fields: string[];
  filter: FilterQuery;
}

export const bookState: BooksState = {
  search: "",
  search_fields: [],
  filter: {},
};

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
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};
