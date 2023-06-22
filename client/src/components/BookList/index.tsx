import { useEffect, useState } from "react";
import { fetchBooks } from "src/api/book";
import { pickDataOrDefault } from "src/types/ApiTypes";
import { Book } from "src/types/book";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate()

  const openDetails = (id: number) => {
    navigate(`/books/${id}`)
  }

  useEffect(() => {
    (async () => {
      const bookList = await fetchBooks();
      setBooks(pickDataOrDefault(bookList, "results", []));
    })();
  }, []);

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