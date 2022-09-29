import { Box } from "@chakra-ui/react";
import { StackRegister } from "components/register/StackRegister";
import { useAuthGuard } from "utils/Auth";

export const Register = () => {
  useAuthGuard();

  return (
    <Box>
      <StackRegister />
    </Box>
  );
};
