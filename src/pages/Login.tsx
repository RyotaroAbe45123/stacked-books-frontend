import { Box, Heading } from "@chakra-ui/react";
import { LoginButton } from "auth/LoginButton";
import { SpinnerComponent } from "components/SpinnerComponent";

type LoginProps = {
  isLoading: boolean;
};

export const Login = ({ isLoading }: LoginProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20%"
    >
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <Box>
          <Heading>Login Page</Heading>
          <Box display="flex" justifyContent="center" marginTop="10px">
            <LoginButton />
          </Box>
        </Box>
      )}
    </Box>
  );
};
