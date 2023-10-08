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
import { Book } from "src/types/book";

interface IProps {
  book: Book;
}

const BookCard = (props: IProps) => {
  const { book } = props;
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
            <Heading size="md" height={50}>{book.title}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Borrow
            </Button>
            <Button variant="ghost" colorScheme="blue">
              See details
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookCard;
