import axios, { ApiError } from "src/api/axios";
import { BookListDecoder } from "src/decoders/book";
import { Book } from "src/types/book";
import { CollectionPayload, ListQuery } from "src/types/common";
import { API_URL } from "src/utils/constants";
import { buildQueryString } from "src/utils/helpers";

export const fetchBooks = async (queryObj?: ListQuery) => {
  /*   const queryObj: ListQuery = {
    search: "time",
    search_fields: ["title"],
    filter: {
      genres: {
        name: "Fantasy",
      },
    },
    ordering: "-title",
    page: 1,
    page_size: 20,
  };
 */
  const queryUrl = `${API_URL}/books/${
    queryObj ? buildQueryString(queryObj) : ""
  }`;

  return await axios.get<CollectionPayload<Book>, ApiError>(
    queryUrl,
    BookListDecoder
  );
};
