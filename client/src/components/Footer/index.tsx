import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box py={10} left="0" bottom="0" right="0">
      <Flex
        align={"center"}
        _before={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: "teal",
          flexGrow: 1,
          mr: 8,
        }}
        _after={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: "teal",
          flexGrow: 1,
          ml: 8,
        }}
      >
        AP Library
      </Flex>
      <Text pt={6} fontSize={"sm"} textAlign={"center"}>
        © 2023 AP Library. All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
