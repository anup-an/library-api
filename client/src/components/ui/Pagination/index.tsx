import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import _ from "lodash";
import { PaginationConfig } from "./Types";

interface IProps {
  paginationConfig: PaginationConfig;
  handlePageChange: (pageNum: number) => void;
}

const SIBLING_COUNT = 1;

const Pagination = (props: IProps) => {
  const { count, pageSize, currentPage } = props.paginationConfig;
  const handlePageChange = props.handlePageChange;
  const total_pages = Math.ceil(count / pageSize);

  const isButtonVisible = (pageNum: number) => {
    const isVisible =
      Math.abs(pageNum - currentPage) <= SIBLING_COUNT ||
      pageNum === 1 ||
      pageNum === total_pages ||
      (pageNum - 1 <= SIBLING_COUNT + 3 &&
        pageNum - currentPage > SIBLING_COUNT) ||
      (total_pages - pageNum <= SIBLING_COUNT + 3 &&
        currentPage - pageNum > SIBLING_COUNT);
    return isVisible;
  };

  const isDotted = (pageNum: number): boolean => {
    const isCurrentVisible = isButtonVisible(pageNum);
    const isPreviousVisible = isButtonVisible(pageNum - 1);
    return !isCurrentVisible && isPreviousVisible;
  };

  return (
    <HStack spacing="10px">
      <IconButton
        variant="solid"
        colorScheme="teal"
        aria-label="Done"
        fontSize="20px"
        icon={<ChevronLeftIcon />}
        isDisabled={currentPage === 1}
        onClick={(e) => handlePageChange(currentPage - 1)}
      />
      {_.range(1, total_pages + 1, 1).map((num) => (
        <>
          {isButtonVisible(num) ? (
            <Button
              colorScheme="teal"  
              width="40px"
              height="40px"
              variant={currentPage === num ? "solid" : "outline"}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </Button>
          ) : isDotted(num) ? (
            <Box
              width="40px"
              height="40px"
              fontWeight="bold"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <p>...</p>
            </Box>
          ) : (
            ""
          )}
        </>
      ))}

      <IconButton
        variant="solid"
        colorScheme="teal"
        aria-label="Done"
        fontSize="20px"
        icon={<ChevronRightIcon />}
        isDisabled={currentPage === total_pages}
        onClick={(e) => handlePageChange(currentPage + 1)}
      />
    </HStack>
  );
};

export default Pagination;
