import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "src/api/axios";
import { borrowBook } from "src/api/user";
import { applyApiEffect } from "src/types/ApiTypes";
import { Book } from "src/types/book";

interface IProps {
  book: Book;
}

const BookCard = (props: IProps) => {
  const { book } = props;
  const navigate = useNavigate();
  const [isBorrowing, setIsBorrowing] = useState<boolean>(false);

  const openDetails = () => {
    navigate(`/books/${book.id}`);
  };

  const handleBorrowBook = async () => {
    setIsBorrowing(true);
    const response = await borrowBook(book.id);
    applyApiEffect(
      response,
      (data) => {
        setIsBorrowing(false);
      },
      (error: ApiError) => {
        setIsBorrowing(false);
      }
    );
  };

  return (
    <>
      <Card>
        <CardBody maxW="sm">
          <Box display="flex" justifyContent="center">
            <Image
              src={book.book_image || undefined}
              alt={book.title}
              borderRadius="lg"
              height={400}
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading size="md" height={50}>
              {book.title}
            </Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleBorrowBook}
              isLoading={isBorrowing}
              loadingText="Borrow"
            >
              Borrow
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={openDetails}>
              See details
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookCard;
