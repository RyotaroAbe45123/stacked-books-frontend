import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "../Card";
import { InputField } from "./InputField";
import { SearchResultField } from "./SearchResultField";

export const StackRegister = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);

  return (
    <Box>
      <Card>
        <Flex
          w="100%"
          h="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="20%"
        >
          <InputField setInputValue={setInputValue} inputValue={inputValue!} />
          <Flex marginTop="30px" marginBottom="20px">
            <SearchResultField inputValue={inputValue} />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
