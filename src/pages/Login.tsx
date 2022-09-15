import { Box, Heading } from "@chakra-ui/react";
import { LoginButton } from "auth/LoginButton";

export const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20%"
    >
      <Box>
        <Heading>Login Page</Heading>
        <Box display="flex" justifyContent="center" marginTop="10px">
          <LoginButton />
        </Box>
      </Box>
    </Box>
  );
};
