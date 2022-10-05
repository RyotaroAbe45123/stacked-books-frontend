import { Flex, Text } from "@chakra-ui/react";
import { words } from "utils/words";

export const NoStacks = () => {
  return (
    <Flex
      minHeight="300px"
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="3xl">{words.books.noStacks}</Text>
    </Flex>
  );
};
