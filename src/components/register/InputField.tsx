import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SpinnerComponent } from "components/SpinnerComponent";
import { useMobileContext } from "contexts/MobileContext";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useStack } from "services/stack/useStack";
import { theme } from "theme/theme";
import { words } from "utils/words";

type InputFieldProps = {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number | null>>;
};

export const InputField = ({ inputValue, setInputValue }: InputFieldProps) => {
  const { isMobile } = useMobileContext();

  const toast = useToast({
    position: "top",
    isClosable: true,
  });

  const [buttonActive, setButtonActive] = useState<boolean>(false);

  useEffect(() => {
    if (String(inputValue).length === 13) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [inputValue]);

  const { postStack, deleteStack, registerLoading } = useStack();

  const postStackFuntion = useCallback(async () => {
    try {
      await postStack(inputValue);
      toast({
        title: "success",
        status: "success",
      });
    } catch {
      toast({
        title: "error",
        status: "error",
      });
    }
  }, [inputValue, postStack, toast]);

  const deleteStackFuntion = useCallback(async () => {
    try {
      await deleteStack(inputValue);
      toast({
        title: "success",
        status: "success",
      });
    } catch {
      toast({
        title: "error",
        status: "error",
      });
    }
  }, [inputValue, deleteStack, toast]);

  return (
    <Box
      w={isMobile ? "90%" : "80%"}
      h="30%"
      minHeight="50px"
      display="flex"
      alignItems="center"
    >
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
                    onClick={postStackFuntion}
                    isDisabled={!buttonActive}
                  >
                    {words.register.stackButtonName}
                  </Button>
                  <Button
                    bg={theme.subColor}
                    h="1.75rem"
                    size="md"
                    marginRight="10px"
                    onClick={deleteStackFuntion}
                    isDisabled={!buttonActive}
                  >
                    {words.register.unstackButtonName}
                  </Button>
                </>
              )}
            </InputRightElement>
          </InputGroup>
        </>
      ) : (
        <Flex alignItems="center" gap="10px">
          <Input
            pr="4.5rem"
            type="number"
            placeholder="Enter ISBN"
            h="3rem"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInputValue(Number(event.target.value))
            }
          />
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="10px"
            width="60px"
            height="60px"
          >
            {registerLoading ? (
              <Box width="60px" height="60px">
                <SpinnerComponent size="sm" />
              </Box>
            ) : (
              <>
                <Button
                  bg={theme.subColor}
                  size="xs"
                  onClick={postStackFuntion}
                  isDisabled={!buttonActive}
                >
                  {words.register.stackButtonName}
                </Button>
                <Button
                  bg={theme.subColor}
                  size="xs"
                  onClick={deleteStackFuntion}
                  isDisabled={!buttonActive}
                >
                  {words.register.unstackButtonName}
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
