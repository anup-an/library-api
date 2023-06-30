import { FilterQuery } from "src/types/common";

interface SearchActionPayload {
  search: string;
  search_fields: string[];
  filter: FilterQuery;
}
export const SEARCH_BOOKS = "SEARCH_BOOKS";

export type SearchBookAction = {
  type: typeof SEARCH_BOOKS;
  payload: SearchActionPayload;
};
