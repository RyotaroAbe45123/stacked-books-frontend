import { Box, Flex } from "@chakra-ui/react";
import { useMobileContext } from "contexts/MobileContext";
import { useState } from "react";
import { Card } from "../Card";
import { InputField } from "./InputField";
import { SearchResultField } from "./SearchResultField";

export const StackRegister = () => {
  const { isMobile } = useMobileContext();

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
          marginTop={isMobile ? "0" : "20%"}
        >
          <InputField setInputValue={setInputValue} inputValue={inputValue!} />
          <Flex
            marginTop={isMobile ? "10px" : "30px"}
            marginBottom="20px"
            w="100%"
          >
            <SearchResultField inputValue={inputValue} />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
