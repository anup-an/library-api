import { Box, Button, Text } from "@chakra-ui/react";

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
      <Box>
        <Button onClick={handleRetry} colorScheme="red">
          Retry
        </Button>
        <Text fontSize="lg" fontWeight="bold">
          {displayText}
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorFetch;
