import { Box, Text } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/spinner"

interface IProps {
    displayText: string
}

const Loader = (props: IProps) => {
    const {displayText} = props
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
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange"
            size="xl"
          />
          <Text fontSize="xl" fontWeight="bold">
            {displayText}
          </Text>
        </Box>
      </Box>
    )
}

export default Loader;