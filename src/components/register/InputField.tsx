import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SpinnerComponent } from "components/SpinnerComponent";
import { useMobileContext } from "contexts/MobileContext";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useStack } from "services/stack/useStack";
import { theme } from "theme/theme";
import { words } from "utils/words";

type InputFieldProps = {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number | null>>;
};

export const InputField = ({ inputValue, setInputValue }: InputFieldProps) => {
  const { isMobile } = useMobileContext();

  const { postStack, deleteStack, registerLoading } = useStack();

  return (
    <Box w="70%" h="30%" minHeight="50px" display="flex" alignItems="center">
      {!isMobile ? (
        <>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              type="number"
              placeholder="Enter ISBN"
              h="3rem"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInputValue(Number(event.target.value))
              }
            />
            <InputRightElement width="10rem" bottom="0" margin="auto">
              {registerLoading ? (
                <SpinnerComponent />
              ) : (
                <>
                  <Button
                    bg={theme.subColor}
                    h="1.75rem"
                    size="md"
                    marginRight="10px"
                    onClick={() => postStack(inputValue)}
                  >
                    {words.register.stackButtonName}
                  </Button>
                  <Button
                    bg={theme.subColor}
                    h="1.75rem"
                    size="md"
                    marginRight="10px"
                    onClick={() => deleteStack(inputValue)}
                  >
                    {words.register.unstackButtonName}
                  </Button>
                </>
              )}
            </InputRightElement>
          </InputGroup>
        </>
      ) : (
        <Box>
          <Input
            pr="4.5rem"
            type="number"
            placeholder="Enter ISBN"
            h="3rem"
            marginBottom="20px"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInputValue(Number(event.target.value))
            }
          />
          <Flex justifyContent="space-around">
            {registerLoading ? (
              <SpinnerComponent />
            ) : (
              <>
                <Button
                  bg={theme.subColor}
                  size="md"
                  onClick={() => postStack(inputValue)}
                >
                  {words.register.stackButtonName}
                </Button>
                <Button
                  bg={theme.subColor}
                  size="md"
                  onClick={() => deleteStack(inputValue)}
                >
                  {words.register.unstackButtonName}
                </Button>
              </>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};
