import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { theme } from "theme/theme";
import { SpinnerComponent } from "./SpinnerComponent";

type InputFieldProps = {
  setInputValue: Dispatch<SetStateAction<number | null>>;
  onClickPost: () => void;
  onClickDelete: () => void;
  isLoading: boolean;
};

export const InputField = ({
  setInputValue,
  onClickPost,
  onClickDelete,
  isLoading,
}: InputFieldProps) => {
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
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <>
              <Button
                bg={theme.subColor}
                h="1.75rem"
                size="md"
                marginRight="10px"
                onClick={() => onClickPost()}
              >
                stack
              </Button>
              <Button
                bg={theme.subColor}
                h="1.75rem"
                size="md"
                marginRight="10px"
                onClick={() => onClickDelete()}
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
