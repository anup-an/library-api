import { Box, Flex } from "@chakra-ui/react";
import UserInfo from "src/components/User";

const UserPage = () => {
  return (
    <div>
      <Box
        w="100%"
        h={["100px", "250px"]}
        bgGradient="linear(to-r, teal.100, teal.500)"
        boxShadow="2xl"
        borderTop="5px"
        borderColor="teal"
      />
      <Flex justifyContent="center">
        <Box
          marginTop={["0px", "-100px"]}
          backgroundColor="gray.100"
          width={["100vw", "80vw"]}
          padding="20px"
          boxShadow="2xl"
          minHeight="500px"
        >
          <UserInfo />
        </Box>
      </Flex>
    </div>
  );
};

export default UserPage;
