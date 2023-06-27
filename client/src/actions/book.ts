interface SearchActionPayload {
  search: string;
  search_fields: string[];
}
export const SEARCH_BOOKS = "SEARCH_BOOKS";

export type SearchBookAction = {
  type: typeof SEARCH_BOOKS;
  payload: SearchActionPayload;
};
