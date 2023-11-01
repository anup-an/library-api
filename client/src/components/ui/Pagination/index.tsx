import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import _ from "lodash";
import { ListConfig } from "src/views/BookListPage";

interface IProps {
  paginationConfig: ListConfig;
  onPageChange: (config: ListConfig) => void;
}

const SIBLING_COUNT = 1;

const Pagination = (props: IProps) => {
  const { onPageChange, paginationConfig } = props;

  const { count, page_size, page } = paginationConfig;
  const total_pages = Math.ceil(count / page_size);

  const isButtonVisible = (pageNum: number) => {
    const isVisible =
      Math.abs(pageNum - page) <= SIBLING_COUNT ||
      pageNum === 1 ||
      pageNum === total_pages ||
      (pageNum - 1 <= SIBLING_COUNT + 3 && pageNum - page > SIBLING_COUNT) ||
      (total_pages - pageNum <= SIBLING_COUNT + 3 &&
        page - pageNum > SIBLING_COUNT);
    return isVisible;
  };

  const isDotted = (pageNum: number): boolean => {
    const isCurrentVisible = isButtonVisible(pageNum);
    const isPreviousVisible = isButtonVisible(pageNum - 1);
    return !isCurrentVisible && isPreviousVisible;
  };

  const handlePageChange = (pageNum: number) => {
    onPageChange({ ...paginationConfig, page: pageNum });
  };

  return (
    <HStack spacing="10px">
      <IconButton
        variant="solid"
        colorScheme="teal"
        aria-label="Done"
        fontSize="20px"
        icon={<ChevronLeftIcon />}
        isDisabled={page === 1}
        onClick={(e) => handlePageChange(page - 1)}
      />
      {_.range(1, total_pages + 1, 1).map((num) => (
        <>
          {isButtonVisible(num) ? (
            <Button
              colorScheme="teal"
              width="40px"
              height="40px"
              display={["none", "none", "none", "none", "flex"]}
              justifyContent="center"
              variant={page === num ? "solid" : "outline"}
              onClick={() => handlePageChange(num)}
            >
              <p>{num}</p>
            </Button>
          ) : isDotted(num) ? (
            <Box
              width="40px"
              height="40px"
              fontWeight="bold"
              justifyContent="center"
              alignItems="center"
              display={["none", "none", "none", "flex"]}
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
        isDisabled={page === total_pages}
        onClick={(e) => handlePageChange(page + 1)}
      />
    </HStack>
  );
};

export default Pagination;
