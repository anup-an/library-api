import { Box, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { StateContext } from "src/App";
import { fetchBooks } from "src/api/book";
import Pagination from "src/components/ui/Pagination";
import { PaginationConfig } from "src/components/ui/Pagination/Types";
import { pickDataOrDefault } from "src/types/ApiTypes";
import { Book } from "src/types/book";
import { ListQuery } from "src/types/common";
import BookCard from "./BookCard";
import "./BookList.scss";

const INITIAL_PAGINATION_CONFIG: PaginationConfig = {
  count: 0,
  pageSize: 20,
  currentPage: 1,
};

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    INITIAL_PAGINATION_CONFIG.currentPage
  );
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>(
    INITIAL_PAGINATION_CONFIG
  );
  const { state } = useContext(StateContext);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    setPaginationConfig({ ...paginationConfig, currentPage: pageNum });
  };

  useEffect(() => {
    (async () => {
      const queryObj: ListQuery = {
        search: state.book.search,
        search_fields: state.book.search_fields,
        filter: state.book.filter,
        ordering: "",
        page: currentPage,
        page_size: paginationConfig.pageSize,
      };
      const bookList = await fetchBooks(queryObj);
      setBooks(pickDataOrDefault(bookList, "results", []));
      setPaginationConfig(config => ({
        ...config,
        count: pickDataOrDefault(bookList, "count", 0),
      }));
    })();
  }, [
    state.book.search,
    state.book.search_fields,
    state.book.filter,
    paginationConfig.pageSize,
    currentPage
  ]);

  return (
    <div className="book-list">
      {paginationConfig.count ? (
        <Box display="flex" justifyContent="flex-end" className="book-list__pagination">
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
