import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "src/api/book";
import { Nullable, extractDataOrNull } from "src/types/ApiTypes";
import { Book } from "src/types/book";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Nullable<Book>>(null);

  useEffect(() => {
    (async () => {
      const bookDetails = id
        ? extractDataOrNull(await fetchBookDetails(id))
        : null;
      setBook(bookDetails);
    })();
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <img alt={book.title} src={book.book_image || ""} />
          <div>{book?.title}</div>
          <div>{book?.description}</div>
        </div>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default BookDetails;
