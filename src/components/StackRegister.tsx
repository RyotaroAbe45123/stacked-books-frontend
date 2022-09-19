import { usePostStack } from "services/stack/usePostStack";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { useDeleteStack } from "services/stack/useDeleteStack";

export const StackRegister = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  console.log(`inpt: ${inputValue}`);

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
      </Card>
    </Box>
  );
};
