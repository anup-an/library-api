import axios, { ApiError } from "src/api/axios";
import { BookDecoder, BookListDecoder } from "src/decoders/book";
import { ApiData } from "src/types/ApiTypes";
import { Book } from "src/types/book";
import { CollectionPayload, ListQuery } from "src/types/common";
import { API_URL } from "src/utils/constants";
import { buildQueryString } from "src/utils/helpers";

export const fetchBooks = async (
  queryObj?: ListQuery
): Promise<ApiData<CollectionPayload<Book>, ApiError>> => {
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

export const fetchBookDetails = async (
  id: string
): Promise<ApiData<Book, ApiError>> => {
  return await axios.get<Book, ApiError>(`${API_URL}/books/${id}`, BookDecoder);
};
