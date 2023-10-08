import { Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "src/App";
import { fetchBooks } from "src/api/book";
import { pickDataOrDefault } from "src/types/ApiTypes";
import { Book } from "src/types/book";
import { ListQuery } from "src/types/common";
import BookCard from "./BookCard";
import "./BookList.scss";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const { state } = useContext(StateContext);

  const openDetails = (id: number) => {
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    (async () => {
      const queryObj: ListQuery = {
        search: state.book.search,
        search_fields: state.book.search_fields,
        filter: state.book.filter,
        ordering: "",
        page: 1,
        page_size: 20,
      };
      const bookList = await fetchBooks(queryObj);
      setBooks(pickDataOrDefault(bookList, "results", []));
    })();
  }, [state.book.search, state.book.search_fields, state.book.filter]);

  return (
    <div className="book-list">
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
