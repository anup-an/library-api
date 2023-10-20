import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
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
import { Button } from "@chakra-ui/react";
import Details from "./Details";

const BOOK_FORMAT_MAPPING = {
  h: "Hard cover",
  m: "Mass Market Paperback",
  k: "Kindle edition",
  e: "Ebook",
  p: "Paperback",
};

export interface DetailsConfig {
  field: string;
  subfield: Nullable<string>;
  isList: boolean;
  mapping?: { [x: string]: string };
}

const detailsConfig: DetailsConfig[] = [
  { field: "title", subfield: null, isList: false },
  { field: "author", subfield: "name", isList: true },
  { field: "genre", subfield: "name", isList: true },
  { field: "language", subfield: "name", isList: false },
  { field: "isbn", subfield: null, isList: false },
  { field: "pages", subfield: null, isList: false },
  {
    field: "book_format",
    subfield: null,
    isList: false,
    mapping: BOOK_FORMAT_MAPPING,
  },
  { field: "publisher", subfield: null, isList: false },
];

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Nullable<Book>>(null);
  const [bookFetch, setBookFetch] = useState<ApiData<Book, ApiError>>(loading);

  const handleBorrow = async (id: number) => {
    const response = await borrowBook(id);
    if (!isSuccess(response)) {
      alert(
        "Failed to borrow book. Please make sure you are already logged in to perform this action"
      );
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
        <Loader displayText="" />
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
    <Box fontSize="16px">
      <Flex
        alignItems={["center", "center", "center", "flex-end"]}
        gap="30px"
        flexDirection={["column", "column", "column", "row"]}
        justifyContent={["center", "center", "center", "flex-start"]}
        width="100%"
      >
        <Box border="gray.100" borderRadius="10px">
          <img alt={book.title} src={book.book_image || ""} />
        </Box>
        <Box width="100%">
          <Grid
            templateColumns="repeat(2, 1fr)"
            rowGap={5}
            maxWidth="500px"
            columnGap={10}
          >
            <Details detailsConfig={detailsConfig} detailsObject={book} />
          </Grid>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => handleBorrow(book.id)}
            marginTop="20px"
          >
            Borrow
          </Button>
        </Box>
      </Flex>
      <Heading fontSize="lg" marginTop="16px">
        Description
      </Heading>
      <Box marginTop="12px" textAlign="justify">
        {book.description}
      </Box>
    </Box>
  );
};

export default BookDetails;
