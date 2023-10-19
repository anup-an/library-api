import { Icon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoRefreshCircleSharp } from "react-icons/io5";

interface IProps {
  displayText: string;
  handleRetry: () => Promise<void>;
}

const ErrorFetch = (props: IProps) => {
  const { displayText, handleRetry } = props;
  return (
    <Box
      minHeight={300}
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Flex>
        <Text fontSize="lg" fontWeight="bold" marginRight={1}>
          {displayText}
        </Text>
        <button onClick={handleRetry}>
          <Icon as={IoRefreshCircleSharp} color="red" boxSize="30px" />
        </button>
      </Flex>
    </Box>
  );
};

export default ErrorFetch;
