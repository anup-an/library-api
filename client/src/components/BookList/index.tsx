import { Box, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { StateContext } from "src/App";
import { ApiError } from "src/api/axios";
import { fetchBooks } from "src/api/book";
import ErrorFetch from "src/components/ui/ErrorFetch";
import Loader from "src/components/ui/Loader";
import Pagination from "src/components/ui/Pagination";
import { PaginationConfig } from "src/components/ui/Pagination/Types";
import {
  ApiData,
  applyApiEffect,
  isFailure,
  isLoading,
  isSuccess,
  loading,
  pickDataOrDefault,
} from "src/types/ApiTypes";
import { Book } from "src/types/book";
import { CollectionPayload, ListQuery } from "src/types/common";
import BookCard from "./BookCard";
import "./BookList.scss";

const INITIAL_PAGINATION_CONFIG: PaginationConfig = {
  count: 0,
  pageSize: 20,
  currentPage: 1,
};

interface IProps {
  emitBooksState: (
    booksState: ApiData<CollectionPayload<Book>, ApiError>
  ) => void;
}

const BookList = (props: IProps) => {
  const { emitBooksState } = props;
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    INITIAL_PAGINATION_CONFIG.currentPage
  );
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>(
    INITIAL_PAGINATION_CONFIG
  );
  const [booksFetch, setBooksFetch] =
    useState<ApiData<CollectionPayload<Book>, ApiError>>(loading);
  const { state } = useContext(StateContext);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    setPaginationConfig({ ...paginationConfig, currentPage: pageNum });
  };

  const handleFetchBooks = async () => {
    const queryObj: ListQuery = {
      search: state.book.search,
      search_fields: state.book.search_fields,
      filter: state.book.filter,
      ordering: "",
      page: currentPage,
      page_size: paginationConfig.pageSize,
    };
    const response = await fetchBooks(queryObj);
    setBooksFetch(response);
    applyApiEffect(
      response,
      (data) => {
        setBooks(pickDataOrDefault(response, "results", []));
        setPaginationConfig((config) => ({
          ...config,
          count: pickDataOrDefault(response, "count", 0),
        }));
      },
      () => {}
    );
  };

  const retryFetch = async () => {
    setBooksFetch(loading);
    await handleFetchBooks();
  };

  useEffect(() => {
    (async () => {
      setBooksFetch(loading);
      await handleFetchBooks();
    })();
  }, [
    state.book.search,
    state.book.search_fields,
    state.book.filter,
    paginationConfig.pageSize,
    currentPage,
  ]);

  useEffect(() => {
    emitBooksState(booksFetch);
  }, [booksFetch]);

  if (isLoading(booksFetch)) {
    return (
      <Box marginTop={85}>
        {paginationConfig.count ? (
          <Box
            display="flex"
            justifyContent="flex-end"
            className="book-list__pagination"
          >
            <Pagination
              paginationConfig={paginationConfig}
              handlePageChange={handlePageChange}
            />
          </Box>
        ) : (
          ""
        )}
        <Loader displayText="" />
      </Box>
    );
  }

  if (isFailure(booksFetch)) {
    return (
      <Box marginTop={85}>
        {paginationConfig.count ? (
          <Box
            display="flex"
            justifyContent="flex-end"
            className="book-list__pagination"
          >
            <Pagination
              paginationConfig={paginationConfig}
              handlePageChange={handlePageChange}
            />
          </Box>
        ) : (
          ""
        )}
        <ErrorFetch
          displayText="Could not load books. Please try again."
          handleRetry={retryFetch}
        />
      </Box>
    );
  }

  if (isSuccess(booksFetch) && books.length === 0) {
    return (
      <Box
        width="100vw"
        minHeight={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={85}
      >
        <Text fontSize="lg" fontWeight="bold">
          No books found based on search and filter criteria.
        </Text>
      </Box>
    );
  }

  return (
    <div className="book-list">
      {paginationConfig.count ? (
        <Box
          display="flex"
          justifyContent="flex-end"
          className="book-list__pagination"
        >
          <Pagination
            paginationConfig={paginationConfig}
            handlePageChange={handlePageChange}
          />
        </Box>
      ) : (
        ""
      )}
      <ul className="book-list__items">
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={6}
          gridAutoFlow="dense"
          justifyContent="center"
          alignItems="center"
        >
          {books.map((book: Book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </Grid>
      </ul>
    </div>
  );
};

export default BookList;
