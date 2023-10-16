import { Box, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiError } from "src/api/axios";
import { fetchBookDetails } from "src/api/book";
import { borrowBook } from "src/api/user";
import {
  ApiData,
  Nullable,
  applyApiEffect,
  isFailure,
  isLoading,
  isSuccess,
  loading,
} from "src/types/ApiTypes";
import { Book } from "src/types/book";
import Loader from "src/components/ui/Loader";
import ErrorFetch from "src/components/ui/ErrorFetch";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Nullable<Book>>(null);
  const [bookFetch, setBookFetch] = useState<ApiData<Book, ApiError>>(loading);

  const handleBorrow = async (id: number) => {
    const response = await borrowBook(id);
    if (!isSuccess(response)) {
      alert("Failed to borrow book");
    }
  };

  const handleBookFetch = async (id: string) => {
    const bookResponse = await fetchBookDetails(id);
    setBookFetch(bookResponse);
    applyApiEffect(
      bookResponse,
      (data: Book) => {
        setBook(data);
      },
      (error) => {}
    );
  };

  const retryFetch = async () => {
    if (id) {
      setBookFetch(loading);
      await handleBookFetch(id);
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        await handleBookFetch(id);
      }
    })();
  }, [id]);

  if (isLoading(bookFetch)) {
    return (
      <Box marginTop={85}>
        <Loader displayText="Loading book! Please wait ..." />
      </Box>
    );
  }

  if (isFailure(bookFetch) || !book) {
    return (
      <Box marginTop={85}>
        <ErrorFetch
          displayText="Error loading book. Please try again."
          handleRetry={retryFetch}
        />
      </Box>
    );
  }

  return (
    <div>
      <div>
        <img alt={book.title} src={book.book_image || ""} />
        <div>
          <div>{book.title}</div>
          <div>
            {book.author.map((author) => (
              <div>{author.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div>{book.description}</div>
      <button onClick={() => handleBorrow(book.id)}>Borrow</button>
    </div>
  );
};

export default BookDetails;
