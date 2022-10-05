import { Box, Heading } from "@chakra-ui/react";
import { Card } from "components/Card";
import { words } from "utils/words";

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
          {words.notFound}
        </Heading>
      </Card>
    </Box>
  );
};
