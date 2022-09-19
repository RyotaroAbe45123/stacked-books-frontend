import { Box, Heading } from "@chakra-ui/react";
import { Card } from "components/Card";

export const NotFound = () => {
  return (
    <Box>
      <Card>
        <Heading
          h="300px"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Not Found!
        </Heading>
      </Card>
    </Box>
  );
};
