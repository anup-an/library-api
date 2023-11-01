import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ApiError } from "src/api/axios";
import { fetchBooks } from "src/api/book";
import ErrorFetch from "src/components/ui/ErrorFetch";
import Loader from "src/components/ui/Loader";
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
import { CollectionPayload } from "src/types/common";
import BookCard from "./BookCard";
import "./BookList.scss";

interface IProps {
  emitBooksState: (
    booksState: ApiData<CollectionPayload<Book>, ApiError>
  ) => void;
}

const BookList = (props: IProps) => {
  const location = useLocation();
  const { emitBooksState } = props;
  const [books, setBooks] = useState<Book[]>([]);
  const [booksFetch, setBooksFetch] =
    useState<ApiData<CollectionPayload<Book>, ApiError>>(loading);

  const handleFetchBooks = async (queryString: string) => {
    const response = await fetchBooks(queryString);
    setBooksFetch(response);
    applyApiEffect(
      response,
      (data) => {
        setBooks(pickDataOrDefault(response, "results", []));
      },
      () => {}
    );
  };

  const retryFetch = async () => {
    setBooksFetch(loading);
    await handleFetchBooks(location.pathname + location.search);
  };

  useEffect(() => {
    (async () => {
      setBooksFetch(loading);
      await handleFetchBooks(location.pathname + location.search);
    })();
  }, [location.pathname, location.search]);

  useEffect(() => {
    emitBooksState(booksFetch);
  }, [booksFetch]);

  if (isLoading(booksFetch)) {
    return (
      <Box marginTop={85}>
        <Loader displayText="" />
      </Box>
    );
  }

  if (isFailure(booksFetch)) {
    return (
      <Box marginTop={85}>
        <ErrorFetch
          displayText="Could not load books. Please try again"
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
      <ul className="book-list__items">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
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
