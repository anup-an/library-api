import { useContext, useEffect, useState } from "react";
import { fetchBooks } from "src/api/book";
import { pickDataOrDefault } from "src/types/ApiTypes";
import { Book } from "src/types/book";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import { StateContext } from "src/App";
import { ListQuery } from "src/types/common";

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
      <h1>List of books</h1>
      <ul className="book-list__items">
        {books.map((book: Book) => (
          <li key={book.id}>
            <button onClick={() => openDetails(book.id)}>{book.title}</button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
