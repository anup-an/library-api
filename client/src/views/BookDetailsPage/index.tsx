import { Box } from "@chakra-ui/layout";

import BookDetails from "src/components/BookDetails";
import "./BookDetailsPage.scss";

const BookDetailsPage = () => {
  return (
    <Box className="book-details-page">
      <div className="book-details-page__details">
        <Box marginTop="60px"></Box>
          <BookDetails />
      </div>
    </Box>
  );
};

export default BookDetailsPage;
