import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "../Card";
import { InputField } from "./InputField";

export const StackRegister = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);

  return (
    <Box>
      <Card heightPixel={400}>
        <InputField setInputValue={setInputValue} inputValue={inputValue!} />
      </Card>
    </Box>
  );
};
