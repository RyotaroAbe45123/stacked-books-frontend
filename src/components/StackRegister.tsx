// import { Box, Button, Input, Spinner } from "@chakra-ui/react";
// import { ChangeEvent, useState } from "react";
import { usePostStack } from "services/stack/usePostStack";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { useDeleteStack } from "services/stack/useDeleteStack";

export const StackRegister = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);

  // const onChange = (event: ChangeEvent<HTMLInputElement>) =>
  //   setInputValue(event.target.value);

  const { isPostLoading, doPost } = usePostStack();
  const { isDeleteLoading, doDelete } = useDeleteStack();

  const onClickPost = () => {
    doPost(inputValue);
  };
  const onClickDelete = () => {
    doDelete(inputValue);
  };

  return (
    <Box>
      <Card heightPixel={400}>
        <InputField
          setInputValue={setInputValue}
          onClickPost={onClickPost}
          onClickDelete={onClickDelete}
          isLoading={isPostLoading || isDeleteLoading}
        />
        {/* <Box
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            w="100%"
            h="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="ISBN"
              onChange={(e) => onChange(e)}
              width="70%"
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <Button marginLeft="10px" onClick={() => onClick()}>
                stack!
              </Button>
            )}
          </Box>
          <Box
            w="100%"
            h="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="ISBN"
              onChange={(e) => onChange(e)}
              width="70%"
            />
            <Button marginLeft="10px" onClick={() => onClick()}>
              unstack!
            </Button>
          </Box>
        </Box> */}
      </Card>
    </Box>
  );
};
