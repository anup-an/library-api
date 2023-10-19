import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Book } from "src/types/book";

interface IProps {
  book: Book;
}

const BookCard = (props: IProps) => {
  const { book } = props;
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <>
      <Card boxShadow="xl" borderRadius="5px" background="none">
        <CardBody maxW="sm">
          <Box display="flex" justifyContent="center" onClick={openDetails}>
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
          <Button variant="ghost" colorScheme="blue" onClick={openDetails}>
            View details
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookCard;
