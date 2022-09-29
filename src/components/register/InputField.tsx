import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SpinnerComponent } from "components/SpinnerComponent";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useStack } from "services/stack/useStack";
import { theme } from "theme/theme";

type InputFieldProps = {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number | null>>;
};

export const InputField = ({ inputValue, setInputValue }: InputFieldProps) => {
  const { postStack, deleteStack, registerLoading } = useStack();
  return (
    <Box w="70%" h="30%" minHeight="50px" display="flex" alignItems="center">
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
                stack
              </Button>
              <Button
                bg={theme.subColor}
                h="1.75rem"
                size="md"
                marginRight="10px"
                onClick={() => deleteStack(inputValue)}
              >
                unstack
              </Button>
            </>
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
